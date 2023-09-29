import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Modal, { ModalProps } from '../modal'
import TextField from '../text-field'

export interface NameInputModalProps extends ModalProps {
  onSubmit: (name: string) => void
  onSkip: VoidFunction
  score: number
}

const NameInputModal: React.FC<NameInputModalProps> = ({
  onSubmit,
  onSkip,
  score,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ mode: 'all' })

  const { ref: inputFormRef, ...restInputProps } = useMemo(() => {
    return register('name', {
      required: 'Enter your name',
      maxLength: {
        value: 40,
        message: 'Enter up to 40 characters',
      },
    })
  }, [register])

  const submitForm = useCallback(() => {
    handleSubmit(({ name }) => onSubmit(name))()
  }, [handleSubmit, onSubmit])

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        submitForm()
      } else if (e.code === 'Escape') {
        restProps.onClose()
        onSkip()
      }
    },
    [onSkip, restProps, submitForm],
  )

  useEffect(() => {
    inputRef.current?.addEventListener('keydown', handleKeydown)
    return () => {
      inputRef.current?.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown])

  useEffect(() => {
    if (restProps.isOpen) {
      inputRef.current?.focus()
    }
  }, [restProps.isOpen])

  return (
    <Modal
      title={
        <>
          Scored{' '}
          <strong className="text-primary">{score.toLocaleString()}</strong>{' '}
          points!
        </>
      }
      okText="Enter"
      cancelText="Skip"
      onOk={submitForm}
      onCancel={onSkip}
      hasCancel
      {...restProps}
    >
      <div className="flex flex-col gap-4">
        <p>Leave your name and check your ranking.</p>
        <TextField
          {...restInputProps}
          ref={(e) => {
            inputFormRef(e)
            inputRef.current = e
          }}
          aria-label="name"
          isBlock
          placeholder="Enter your name"
          hasError={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </div>
    </Modal>
  )
}

NameInputModal.displayName = 'NameInputModal'

export default NameInputModal

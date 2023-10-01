import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Modal, { ModalProps } from '../modal'
import TextField from '../text-field'

export interface NameInputModalProps extends ModalProps {
  onSubmit: (name: string) => void
  onSkip: VoidFunction
  score: number
  defaultName?: string
}

const NameInputModal: React.FC<NameInputModalProps> = ({
  onSubmit,
  onSkip,
  score,
  defaultName,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: 'all',
    defaultValues: { name: defaultName },
  })

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
    handleSubmit(({ name }) => {
      onSubmit(name)
      restProps.onClose()
    })()
  }, [handleSubmit, onSubmit, restProps])

  const skip = useCallback(() => {
    restProps.onClose()
    onSkip()
  }, [onSkip, restProps])

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        submitForm()
      } else if (e.code === 'Escape') {
        skip()
      }
    },
    [skip, submitForm],
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
      onCancel={skip}
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

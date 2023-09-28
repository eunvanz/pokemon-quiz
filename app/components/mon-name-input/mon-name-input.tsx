'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import tw from 'twin.macro'
import Button from '../button'
import TextField from '../text-field'

const CHARACTERS_TO_IGNORE_REGEX = /♂|♀/

export interface MonNameInputProps {
  onSubmit: (name: string) => void
  correctAnswers: string[]
  onSkip: VoidFunction
}

const MonNameInput = forwardRef<HTMLInputElement, MonNameInputProps>(
  ({ onSubmit, correctAnswers, onSkip }, ref) => {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
      setValue,
      reset,
    } = useForm<{ monName: string }>({ mode: 'onSubmit' })

    const resetValue = useCallback(() => {
      setValue('monName', '')
    }, [setValue])

    const monNameInputRef = useRef<HTMLInputElement | null>()

    const focusInput = useCallback(() => {
      monNameInputRef.current?.focus()
    }, [])

    const handleOnSubmit = useCallback(
      ({ monName }: { monName: string }) => {
        if (
          correctAnswers
            .map((answer) =>
              answer.toLowerCase().replace(CHARACTERS_TO_IGNORE_REGEX, ''),
            )
            .includes(monName.toLowerCase())
        ) {
          onSubmit(monName)
          resetValue()
        } else {
          setError('monName', { message: "It's wrong answer" })
          resetValue()
        }
      },
      [correctAnswers, onSubmit, resetValue, setError],
    )

    const { ref: monNameInputFormRef, ...restTextFieldProps } = useMemo(() => {
      return register('monName', { required: 'Input the answer' })
    }, [register])

    const skip = useCallback(() => {
      onSkip()
      reset()
      focusInput()
    }, [focusInput, onSkip, reset])

    const skipOnSpaceKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          e.preventDefault()
          skip()
        }
      },
      [skip],
    )

    useEffect(() => {
      monNameInputRef.current?.addEventListener('keydown', skipOnSpaceKeyDown)
      return () => {
        monNameInputRef.current?.removeEventListener(
          'keydown',
          skipOnSpaceKeyDown,
        )
      }
    }, [skipOnSpaceKeyDown])

    useImperativeHandle(ref, () => monNameInputRef.current as HTMLInputElement)

    return (
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div css={tw`flex items-start`}>
          <div css={tw`flex-1 pr-2`}>
            <TextField
              {...restTextFieldProps}
              ref={(e) => {
                monNameInputFormRef(e)
                monNameInputRef.current = e
              }}
              aria-label="mon name"
              isBlock
              placeholder="Enter Pokémon's name"
              hasError={!!errors.monName}
              errorMessage={errors.monName?.message}
              autoComplete="off"
            />
          </div>
          <Button css={tw`px-6`} type="submit" onClick={focusInput}>
            Fire (Enter)
          </Button>
        </div>
        <div css={tw`pt-2`}>
          <Button
            css={tw`w-full`}
            color="secondary"
            type="button"
            onClick={skip}
          >
            Skip (Space bar)
          </Button>
        </div>
      </form>
    )
  },
)

MonNameInput.displayName = 'MonNameInput'

export default MonNameInput

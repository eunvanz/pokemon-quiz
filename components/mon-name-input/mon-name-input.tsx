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
  onFail: VoidFunction
}

const MonNameInput = forwardRef<HTMLInputElement, MonNameInputProps>(
  ({ onSubmit, correctAnswers, onSkip, onFail }, ref) => {
    const isSpacePressedRef = useRef<boolean>(false)

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
        if (!monName.length) return
        if (
          correctAnswers
            .map((answer) =>
              answer
                .toLowerCase()
                .replace(CHARACTERS_TO_IGNORE_REGEX, '')
                .replaceAll(' ', '')
                .trim(),
            )
            .includes(monName.toLowerCase().replaceAll(' ', '').trim())
        ) {
          onSubmit(monName)
          resetValue()
        } else {
          setError('monName', { message: "It's wrong answer" })
          resetValue()
          onFail()
        }
      },
      [correctAnswers, onFail, onSubmit, resetValue, setError],
    )

    const { ref: monNameInputFormRef, ...restTextFieldProps } = useMemo(() => {
      return register('monName')
      // return register('monName', { required: 'Input the answer' })
    }, [register])

    const skip = useCallback(() => {
      onSkip()
      reset()
      focusInput()
      setTimeout(() => {
        setValue('monName', '')
      })
    }, [focusInput, onSkip, reset, setValue])

    const skipOnSpaceKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          if (isSpacePressedRef.current) {
            skip()
          }
          isSpacePressedRef.current = true
          setTimeout(() => (isSpacePressedRef.current = false), 200)
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

    useEffect(() => {
      reset()
    }, [correctAnswers, reset])

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
            Skip (Space bar x 2)
          </Button>
        </div>
      </form>
    )
  },
)

MonNameInput.displayName = 'MonNameInput'

export default MonNameInput

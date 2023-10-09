import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Fragment, useMemo } from 'react'

export interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  buttonClassName?: string
}

export interface SelectOption {
  label: string
  value: string
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  buttonClassName,
  ...restProps
}) => {
  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={classNames('relative', className)} {...restProps}>
        <Listbox.Button
          className={classNames(
            'relative w-full cursor-default rounded-lg bg-white p-2 sm:p-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 text-sm sm:text-base border-2 border-gray-200',
            buttonClassName,
          )}
        >
          <span className="block truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        {/* @ts-ignore */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(({ value, label }) => (
              <Listbox.Option
                key={value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 sm:pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-primary' : 'text-gray-900'
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 hidden sm:flex items-center pl-3 text-primary">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

Select.displayName = 'Select'

export default Select

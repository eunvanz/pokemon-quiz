import { ReactNode } from 'react'

export interface CheckboxProps {
  isChecked: boolean
  onChange: (isChecked: boolean) => void
  id?: string
  value: string
  children: ReactNode
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  id,
  value,
  children,
}) => {
  return (
    <div className="flex items-center">
      <input
        checked={isChecked}
        id={value || id}
        type="checkbox"
        value={value}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={value || id} className="ml-2 text-sm sm:text-base">
        {children}
      </label>
    </div>
  )
}

export default Checkbox

import { RankSearchParams } from '@/lib/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import Button from '../button'
import Checkbox from '../checkbox'
import Select from '../select'
import TextField from '../text-field'

export interface SearchInputProps {
  onSearch: (condition: SearchCondition) => void
  onUniqueNameConditionChange: (isChecked: boolean) => void
}

export type Category = keyof Omit<RankSearchParams, 'page'>

export interface SearchCondition {
  category: Category
  keyword: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onUniqueNameConditionChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState<Category>('name')
  const [keyword, setKeyword] = useState<string>('')
  const [isUniqueName, setIsUniqueName] = useState<boolean>(true)

  const handleOnSearch = useCallback(() => {
    onSearch({ category, keyword })
  }, [category, keyword, onSearch])

  useEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleOnSearch()
      }
    },
    inputRef,
  )

  useEffect(() => {
    onUniqueNameConditionChange(isUniqueName)
  }, [isUniqueName, onUniqueNameConditionChange])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <Select
          options={[
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Country',
              value: 'country',
            },
          ]}
          value={category}
          onChange={(value) => setCategory(value as Category)}
          className="w-28 sm:w-32"
        />
        <TextField
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleOnSearch}>Search</Button>
      </div>
      <Checkbox
        isChecked={isUniqueName}
        onChange={setIsUniqueName}
        value="uniqueName"
      >
        Unique by name
      </Checkbox>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput

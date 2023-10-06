import { RankSearchParams } from '@/lib/types'
import { useCallback, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import Button from '../button'
import Select from '../select'
import TextField from '../text-field'

export interface SearchInputProps {
  onSearch: (condition: SearchCondition) => void
}

export type Category = keyof Omit<RankSearchParams, 'page'>

export interface SearchCondition {
  category: Category
  keyword: string
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState<Category>('name')
  const [keyword, setKeyword] = useState<string>('')

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

  return (
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
        className="w-52"
      />
      <TextField
        ref={inputRef}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={handleOnSearch}>Search</Button>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput

import { RankSearchParams } from '@/lib/types'
import { useState } from 'react'
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
  const [category, setCategory] = useState<Category>('name')
  const [keyword, setKeyword] = useState<string>('')

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
      />
      <TextField value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button onClick={() => onSearch({ category, keyword })}>Search</Button>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput

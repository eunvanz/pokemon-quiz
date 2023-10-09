import useI18n from '@/lib/hooks/use-i18n'
import { RankSearchParams } from '@/lib/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import Button from '../button'
import Checkbox from '../checkbox'
import Select from '../select'
import TextField from '../text-field'

export interface SearchInputProps {
  onSearch: (condition: SearchCondition) => void
  onUniqueNameConditionChange: (isChecked: boolean) => void
  defaultUniqueNameCondition?: boolean
}

export type Category = keyof Omit<RankSearchParams, 'page'>

export interface SearchCondition {
  category: Category
  keyword: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onUniqueNameConditionChange,
  defaultUniqueNameCondition,
}) => {
  const i18n = useI18n()

  const inputRef = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState<Category>('name')
  const [keyword, setKeyword] = useState<string>('')
  const [isUniqueName, setIsUniqueName] = useState<boolean>(
    defaultUniqueNameCondition || false,
  )

  const placeholder = useMemo(() => {
    if (category === 'name') {
      return i18n.t('searchInput.namePlaceholder')
    } else if (category === 'country') {
      return i18n.t('searchInput.countryPlaceholder')
    }
  }, [category, i18n])

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
              label: i18n.t('common.name'),
              value: 'name',
            },
            {
              label: i18n.t('common.country'),
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
          placeholder={placeholder}
        />
        <Button onClick={handleOnSearch}>{i18n.t('searchInput.search')}</Button>
      </div>
      <Checkbox
        isChecked={isUniqueName}
        onChange={setIsUniqueName}
        value="uniqueName"
      >
        {i18n.t('searchInput.highestScoreOnly')}
      </Checkbox>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput

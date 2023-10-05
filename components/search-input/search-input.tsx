export interface SearchInputProps {
  onSearch: (condition: SearchCondition) => void
}

export interface SearchCondition {
  category: 'name' | 'country'
  keyword: string
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return <div></div>
}

export default SearchInput

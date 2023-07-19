import styled from 'styled-components';
import { debounce } from 'lodash'
import { FilterWarehouseOptionModel } from '../../models/filter-warehouse-option.model';

const InputSearch = styled.div`
  position: relative;
  margin: auto: 0;
`;

const Input = styled.input`
  border: 1px solid #999;
  border-radius: 8px;
  height: auto;
  line-height: 24px;
  padding: 5px 40px 5px 15px;
  width: 280px;
`;

interface SearchBarProps {
  onSearch: (options: FilterWarehouseOptionModel) => void,
  placeholder: string
}

const SearchBar = (props: SearchBarProps) => {
  const { onSearch, placeholder } = props;
  const debouncedOnSearch = debounce(onSearch, 400);

  return (
    <InputSearch>
      <Input onChange={(v) => {
        debouncedOnSearch({
          query: v.target.value
        });
      }} placeholder={placeholder}/>
    </InputSearch>
  );
};

export default SearchBar;

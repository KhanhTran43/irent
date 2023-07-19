import styled from 'styled-components';

const InputSearch = styled.div`
  flex-grow: 1;
  margin-right: 15px;
  position: relative;
  margin-bottom: 48px;
`;

const Input = styled.input`
  border: 1px solid #999;
  border-radius: 8px;
  height: auto;
  line-height: 24px;
  padding: 5px 40px 5px 15px;
  width: 280px;
`;

const SearchBar = () => {
  return (
    <InputSearch>
      <Input />
    </InputSearch>
  );
};

export default SearchBar;

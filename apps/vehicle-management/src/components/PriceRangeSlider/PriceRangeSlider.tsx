import { debounce } from 'lodash';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { FilterWarehouseOptionModel } from '../../models/filter-warehouse-option.model';
import { useState } from 'react';
import styled from 'styled-components';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onInput: (options: FilterWarehouseOptionModel) => void;
}

const PriceRangeSlider = (props: PriceRangeSliderProps) => {
  const { min, max, onInput } = props;
  const [value, setValue] = useState<[number, number]>([min, max]);
  const debouncedOnInput = debounce(onInput, 400);

  return (
    <Container>
      <Title>
        <Text>{value[0]}$</Text>
        <Text>-</Text>
        <Text>{value[1]}$</Text>
      </Title>
      <RangeSlider
        min={min}
        max={max}
        defaultValue={[min, max]}
        onInput={(priceRange: [number, number]) => {
          setValue(priceRange);
        }}
        onThumbDragEnd={() => {
          debouncedOnInput({
            priceRange: value,
          });
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
`;

const Title = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const Text = styled.span``;

export default PriceRangeSlider;

import 'react-range-slider-input/dist/style.css';

import { debounce } from 'lodash';
import { useState } from 'react';
import { useCallback } from 'react';
import RangeSlider from 'react-range-slider-input';
import styled from 'styled-components';

type PriceRangeSliderProps = {
  min: number;
  max: number;
  onInput?: (options: [number, number]) => void;
};

export const PriceRangeSlider = (props: PriceRangeSliderProps) => {
  const { min, max, onInput } = props;
  const [value, setValue] = useState<[number, number]>([min, max]);
  const debouncedOnInput = useCallback(
    debounce((options: [number, number]) => onInput?.(options), 400),
    [],
  );

  return (
    <Container>
      <Title>
        <Text>{value[0]}$</Text>
        <Text>-</Text>
        <Text>{value[1]}$</Text>
      </Title>
      <RangeSlider
        defaultValue={[min, max]}
        max={max}
        min={min}
        onInput={(priceRange: [number, number]) => {
          setValue(priceRange);
        }}
        onThumbDragEnd={() => {
          debouncedOnInput(value);
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

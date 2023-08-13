import { findLastIndex } from 'lodash';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useImmerReducer } from 'use-immer';

import { StepperProvider } from './context/StepperContext';
import { StepperAction, StepperItemModel } from './models/stepper-item.model';

type StepperProps = {
  items: StepperItemModel[];
  children?: ReactNode;
};

const getStepperItemsState = (items: StepperItemModel[]) => {
  const currentItem = items.find((i) => i.status === 'active');
  const currentIndex = currentItem !== undefined ? items.indexOf(currentItem) : -1;
  const isLastStep = currentIndex === items.length - 1;
  const isFirstStep = currentIndex === 0;

  return { currentItem, currentIndex, isLastStep, isFirstStep };
};

// TODO: I think this component need a controllable `items` for further use
// You may need this to implement that: https://github.com/radix-ui/primitives/tree/main/packages/react/use-controllable-state
const Stepper = ({ items: propItems, children }: StepperProps) => {
  const [isCanNext, setCanNext] = useState<boolean>(true);
  const [isDisable, setDisable] = useState<boolean>(false);

  const stepReducer = (state: StepperItemModel[], action: StepperAction) => {
    function updateIndex(newIndex: number) {
      state.forEach((item, index) => {
        if (index < newIndex) item.status = 'finish';
        else if (index === newIndex) item.status = 'active';
        else item.status = 'default';
      });
    }

    const { currentIndex, isLastStep, isFirstStep } = getStepperItemsState(state);

    switch (action.type) {
      case 'jump':
        return;
      case 'next': {
        console.log('next');

        if (isLastStep) break;

        updateIndex(currentIndex + 1);

        break;
      }
      case 'back': {
        console.log('back');

        if (isFirstStep) break;

        updateIndex(currentIndex - 1);

        break;
      }
      case 'set':
        state = action.new;
        break;
      default:
        return state;
    }
  };

  const [items, dispatch] = useImmerReducer(stepReducer, propItems);

  const { currentIndex, currentItem, isLastStep, isFirstStep } = useMemo(() => getStepperItemsState(items), [items]);

  useEffect(() => {
    let farthestActiveIndex = findLastIndex(propItems, { status: 'active' });
    farthestActiveIndex = farthestActiveIndex === -1 ? 0 : farthestActiveIndex;

    propItems.forEach((item, index) => {
      if (index < farthestActiveIndex) item.status = 'finish';
      else if (index === farthestActiveIndex) item.status = 'active';
      else item.status = 'default';
    });

    dispatch({ type: 'set', new: propItems });
  }, [propItems]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const jump = (step: number) => {
    dispatch({ type: 'jump', step });
  };

  const next = () => {
    dispatch({ type: 'next' });
  };

  const back = () => {
    dispatch({ type: 'back' });
  };

  return (
    <StepperProvider
      back={back}
      currentIndex={currentIndex}
      currentItem={currentItem}
      isCanNext={isCanNext}
      isDisable={isDisable}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      items={items}
      jump={jump}
      next={next}
      setCanNext={setCanNext}
      setDisable={setDisable}
    >
      {children}
    </StepperProvider>
  );
};

export default Stepper;

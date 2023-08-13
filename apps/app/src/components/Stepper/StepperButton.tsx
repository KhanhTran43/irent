import { ReactNode } from 'react';

import Button, { ButtonProps } from '../Button/Button';
import { useStepperContext } from './context';
import { StepperActionType } from './models/stepper-item.model';

export type StepperButtonAction = {
  type: StepperActionType;
  payload?: any;
};

export type StepperButtonProps = Omit<ButtonProps, 'children'> & {
  content?: ReactNode;
};

export type NextStepperButtonProps = StepperButtonProps & {
  finishContent?: ReactNode;
};

export const StepperNextButton = ({
  onClick,
  disabled,
  content: buttonContent = 'Tiếp theo',
  finishContent = 'Hoàn thành',
  ...otherProps
}: NextStepperButtonProps) => {
  const { next, isCanNext, isLastStep } = useStepperContext(StepperNextButton.name);
  const mergedDisabled = disabled === true ? true : disabled ?? !isCanNext;

  const handleNextClick = () => {
    next();
    onClick?.();
  };

  return (
    <Button onClick={handleNextClick} {...otherProps} disabled={mergedDisabled}>
      {isLastStep ? finishContent : buttonContent}
    </Button>
  );
};

export type BackStepperButtonProps = StepperButtonProps;

export const StepperBackButton = ({
  onClick,
  disabled,
  content: buttonContent = 'Quay lại',
  ...otherProps
}: StepperButtonProps) => {
  const { back, currentIndex } = useStepperContext(StepperBackButton.name);
  const mergedDisabled = disabled === true ? true : disabled ?? currentIndex <= 0;

  const handleNextClick = () => {
    back();
    onClick?.();
  };

  return (
    <Button onClick={handleNextClick} {...otherProps} disabled={mergedDisabled}>
      {buttonContent}
    </Button>
  );
};

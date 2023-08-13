import { ReactNode } from 'react';

export type StepperItemModel = {
  status: 'finish' | 'active' | 'default';
  label: string;
  content?: ReactNode;
};

export type StepperActionType = 'next' | 'back' | 'jump' | 'set';

export type StepperAction = (
  | { type: Extract<StepperActionType, 'jump'>; step: number }
  | { type: Extract<StepperActionType, 'set'>; new: StepperItemModel[] }
  | { type: Exclude<StepperActionType, 'jump'> }
) & { [key: string]: any };

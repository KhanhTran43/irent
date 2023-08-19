import { violet } from '@radix-ui/colors';
import { SewingPinFilledIcon, TimerIcon } from '@radix-ui/react-icons';
import moment from 'moment';
import styled from 'styled-components';

import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';
import { WarehouseViewCardBase } from '../WarehouseViewCardBase';

type MyWarehouseViewCardProps = {
  warehouse: MyWarehouseDetailsModel;
  onClick: (id: number) => void;
};

export const MyWarehouseViewCard = (props: MyWarehouseViewCardProps) => {
  return <WarehouseViewCardBase {...props} showRentedProgression></WarehouseViewCardBase>;
};

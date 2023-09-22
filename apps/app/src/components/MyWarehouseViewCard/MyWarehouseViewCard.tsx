import { red } from '@radix-ui/colors';
import { useCallback, useRef, useState } from 'react';

import { api } from '@/axios/axios';
import { RentedWarehouseStatus } from '@/models/rented-warehouse.model';
import rentedWarehouseService from '@/service/rented-warehouse-service';

import { MyWarehouseDetailsModel } from '../../models/my-warehouse-details.model';
import { ConfirmDialog, ConfirmDialogProps } from '../Common/Dialog';
import { CustomerPaymentDialog, CustomerPaymentDialogProps } from '../Payment';
import { WarehouseViewCardBase, WarehouseViewCardProps } from '../WarehouseViewCardBase';
import { CardActions } from '../WarehouseViewCardBase/CardOptions';

export enum MyWarehouseViewCardType {
  History,
  Owning,
  Renting,
}

type MyWarehouseViewCardProps = {
  warehouse: MyWarehouseDetailsModel;
  type?: MyWarehouseViewCardType;
  onClick: (id: number) => void;
};

type ActionDialog =
  | {
      type: 'confirm';
      options?: ConfirmDialogProps;
    }
  | {
      type: 'payment';
      options?: CustomerPaymentDialogProps;
    };

export const MyWarehouseViewCard = ({ type = MyWarehouseViewCardType.Renting, ...props }: MyWarehouseViewCardProps) => {
  const warehouse = props.warehouse;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<ActionDialog>();

  const getRentingTypeActions = useCallback((): CardActions[] => {
    const requestCancelActions: CardActions = {
      title: 'Yêu cầu hủy',
      onClick: () => {
        setActionDialog({
          type: 'confirm',
          options: {
            children: 'Xác nhận gửi yêu cầu hủy thuê?',
            onAccept: () => console.log('Hủy'),
          },
        });
        setDialogOpen(true);
      },
      customHoverBackgroundColor: red.red9,
    };

    const confirmActions: CardActions = {
      title: 'Thanh toán',
      onClick: handleConfirmAction,
    };

    switch (warehouse.rentedInfo?.status) {
      case RentedWarehouseStatus.Waiting:
        return [confirmActions, requestCancelActions];
      default:
        return [];
    }
  }, [warehouse.rentedInfo?.status]);

  const getViewCardOptions = (): Partial<WarehouseViewCardProps> => {
    switch (type) {
      case MyWarehouseViewCardType.Renting:
        return { showRentedProgression: true, showStatus: true, actions: getRentingTypeActions() };
      default:
        return {};
    }
  };

  const handleConfirmAction = () => {
    const { rentedInfo, userId: ownerId } = warehouse;
    if (rentedInfo) {
      const { confirm, renterId } = rentedInfo;

      const clientSecretPromise = api
        .post<{ clientSecret: string }>('/payment/fee', { amount: confirm, ownerId, userId: renterId })
        .then((response) => {
          return response.data.clientSecret;
        });

      setActionDialog({
        type: 'payment',
        options: { clientSecret: () => clientSecretPromise },
      });
      setDialogOpen(true);
    }
  };

  const handleConfirmPaymentSuccess = () => {
    if (warehouse.rentedInfo) rentedWarehouseService.confirmWarehouse(warehouse.rentedInfo.id);
  };

  const renderDialog = () => {
    if (actionDialog) {
      switch (actionDialog.type) {
        case 'confirm': {
          const { options } = actionDialog;
          return <ConfirmDialog {...options} open={dialogOpen} onOpenChange={setDialogOpen}></ConfirmDialog>;
        }
        case 'payment': {
          const { options } = actionDialog;
          return (
            <CustomerPaymentDialog
              {...options}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onSucceed={handleConfirmPaymentSuccess}
            ></CustomerPaymentDialog>
          );
        }
      }
    }
  };

  return (
    <>
      <WarehouseViewCardBase {...props} {...getViewCardOptions()}></WarehouseViewCardBase>
      {dialogOpen && renderDialog()}
    </>
  );
};

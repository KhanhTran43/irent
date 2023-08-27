import moment from 'moment';
import { useCallback } from 'react';

import { formatPrice } from '@/utils/format-price.util';
import { generatePdfContent, PdfOptions } from '@/utils/generate-pdf.util';

export const testOptions: PdfOptions = {
  owner: { name: 'Trần Quốc Khánh', ioc: '123457', phoneNumber: '09055513099' },
  duration: 1,
  rentedDate: moment().startOf('days').format(),
  endDate: moment().startOf('days').add(30, 'days').format(),
  renter: { name: 'Hồ Hữu Tình', ioc: '123456', phoneNumber: '09055513095' },
  warehouse: {
    address: 'abc',
    area: 123,
    doors: 1,
    floors: 2,
    name: 'kho bai sieu dep',
    price: 2000,
  },
};

type ViewContractOptions = {
  containerId: string;
  base64: string;
};

type CreateContractOptions = {
  pdfOptions: PdfOptions;
};

export type CreateContract = {
  open: () => void;
  getBase64: (callback: (base64: string) => void) => void;
};

export function useContract() {
  const viewContract = useCallback((options: ViewContractOptions) => {
    _embedPdf(options.containerId, options.base64);
  }, []);

  const createContract = useCallback((options: CreateContractOptions): CreateContract => {
    const docDefinition = generatePdfContent(options.pdfOptions);
    const pdfDocGenerator = (window as any).pdfMake.createPdf(docDefinition);

    const open = () => {
      pdfDocGenerator.open();
    };

    const getBase64 = (callback: (base64: string) => void) => {
      pdfDocGenerator.getBase64(callback);
    };

    return {
      open,
      getBase64,
    };
  }, []);

  function _embedPdf(containerId: string, base64: string) {
    const containerElement = document.getElementById(containerId);

    if (containerElement === null) throw Error(`Element with id #${containerId} for map search box is not existed`);

    containerElement.innerHTML = '';

    const embed = document.createElement('embed');
    embed.src = `data:application/pdf;base64,${base64}`;
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '100%';
    containerElement?.append(embed);
  }

  return { viewContract, createContract, testOptions };
}

import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { apiUrl } from '../../provider';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type RentedWarehouseRevenue = {
  rentedDate: Date;
  rentedMonth: number;
  rentedYear: number;
  deposit: number;
  total: number;
  status: number;
};

type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
};

export const Revenue = () => {
  const [rentedWarehouseRevenue, setRentedWarehouseRevenue] = useState<RentedWarehouseRevenue[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>();
  const [bar, setBar] = useState<any>();

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/api/RentedWarehouse/static`, {
        includes: ['Warehouse'],
      })
      .then((m) =>
        m.data.map((it: any) => {
          const info = it.rentedInfo;
          const rentedMonth = new Date(info.rentedDate).getMonth() + 1;
          const rentedYear = new Date(info.rentedDate).getFullYear();

          return {
            rentedDate: info.rentedDate,
            deposit: info.deposit,
            total: info.total,
            status: info.status,
            rentedMonth,
            rentedYear,
          };
        }),
      )
      .then((v) => setRentedWarehouseRevenue(v));
  }, []);

  useEffect(() => {
    const monthLabels = generateMonthLabels();
    setChartData({
      labels: monthLabels,
      datasets: [
        {
          label: 'Doanh thu',
          data: calculateRevenuePerMonthByStatus(rentedWarehouseRevenue),
          backgroundColor: '#2196f3',
        },
      ],
    });
  }, [rentedWarehouseRevenue]);

  useEffect(() => {
    const { labels, datasets } = chartData ?? {};

    if (!!labels && !!datasets) {
      setBar({
        labels,
        datasets,
      });
    }
  }, [chartData]);

  return (
    <>
      <h1>Doanh thu</h1>
      <h4>Năm 2023</h4>
      {bar ? <Bar options={barChartOptions} data={bar as any} /> : <></>}
      <Spacing />
      <MonthBarChartWrapper>
        <h4>Tháng 1</h4>
        {bar ? <Bar options={barChartOptions} data={bar as any} /> : <></>}
      </MonthBarChartWrapper>
    </>
  );
};

const barChartOptions = {
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        autoSkipPadding: 0.5,
      },
    },
    y: {
      ticks: {
        callback: function (value: any) {
          return (value * 1000).toLocaleString('vi-VN') + ' VND';
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        labelTextColor: function () {
          return 'white';
        },
        // title: function (data: any) {
        //   console.log(data);
        //   return [data[0].label.split(',').join(' ')];
        // },
        label: function (data: any) {
          return (data.raw * 1000).toLocaleString('vi-VN') + ' VND';
        },
      },
    },
  },
};

function generateMonthLabels(): string[] {
  return [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
}

function calculateRevenuePerMonthByStatus(data: RentedWarehouseRevenue[]): number[] {
  const monthLabels = generateMonthLabels();
  const dataByMonth = data.reduce(
    (prev, curr) => {
      const label = monthLabels[curr.rentedMonth - 1];
      if (prev[label]) {
        prev[label].push(curr);
      } else {
        prev[label] = [curr];
      }

      return prev;
    },
    {} as Record<string, RentedWarehouseRevenue[]>,
  );

  return monthLabels.map((it) => {
    const dataInMonth = dataByMonth[it] ?? [];

    return dataInMonth.reduce((prev, curr) => {
      if ([1, 3, 5].includes(curr.status)) {
        return prev + (curr.deposit * 2) / 100;
      }

      if ([2, 6, 7].includes(curr.status)) {
        return prev + (curr.total * 2) / 100;
      }

      return 0;
    }, 0);
  });
}

const Spacing = styled.div`
  margin: 16px 0;
`;

const MonthBarChartWrapper = styled.div`
  background: rgba(0, 0, 0, 0.025);
  padding: 8px 16px;
  border-radius: 8px;
`;


import axios from 'axios';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

import { ChartData } from '../../models/chart-data.model';
import { apiUrl } from '../../provider';

ChartJS.register(ArcElement, Tooltip, Legend);

type UserPieData = {
  id: number;
  role: number;
  email: string;
};

export const Users = () => {
  const [users, setUsers] = useState<UserPieData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>();

  useEffect(() => {
    axios
      .post<any, any>(`${apiUrl}/api/user/static`, {})
      .then((m) =>
        m.data.map((it: any) => {
          return {
            id: it.id,
            role: it.role,
            email: it.email,
          };
        }),
      )
      .then((v) => setUsers(v));
  }, []);

  useEffect(() => {
    console.log(users);
    setChartData({
      labels: ['Chủ kho bãi', 'Người thuê'],
      datasets: [
        {
          label: 'Số lượng',
          data: users.reduce(
            (prev, curr) => {
              if (curr.role === 1) {
                prev[0] += 1;
              } else {
                prev[1] += 2;
              }

              return prev;
            },
            [0, 0],
          ),
          backgroundColor: ['#2196f3', 'rgba(255, 159, 64, 0.5)'],
        },
      ],
    });
  }, [users]);

  return <Container>{chartData ? <Pie data={chartData} /> : <></>}</Container>;
};

const Container = styled.div`
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
`;


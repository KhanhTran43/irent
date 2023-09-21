import { violet } from '@radix-ui/colors';
import moment from 'moment';
import { useEffect, useState } from 'react';
import format from 'string-template';
import styled from 'styled-components';

export type DateProgressProps = {
  startDate?: string;
  endDate?: string;
  daysLeftTemplate?: string;
};

export const DateProgress = ({ startDate, endDate, daysLeftTemplate = 'Còn {0}' }: DateProgressProps) => {
  const now = moment().startOf('days');
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const calculateProgress = () => {
    let daysMax = 0;
    let daysPassed = 0;
    if (startMoment.isValid() && endMoment.isValid()) {
      daysMax = endMoment.diff(startMoment, 'days');
      daysPassed = now.diff(startMoment, 'days');
    }

    return { daysMax, daysPassed };
  };

  const { daysMax, daysPassed } = calculateProgress();

  const [timeLeft, setTimeLeft] = useState<string>();

  useEffect(() => {
    const targetTime = moment(endDate); // Set your target time here

    const updateTimer = () => {
      const now = moment();
      const duration = moment.duration(targetTime.diff(now));

      if (duration.days() > 0) {
        setTimeLeft(`${duration.days()} ngày`);
      } else if (duration.milliseconds() >= 0) {
        setTimeLeft(`${duration.hours()} giờ`);
      } else {
        setTimeLeft(undefined);
      }
    };

    updateTimer(); // Initial update
    const intervalId = setInterval(updateTimer, 3600000); // Update every hour

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const daysLeftDisplay = timeLeft ? format(daysLeftTemplate, [timeLeft]) : 'Hết hạn.';

  return (
    <>
      <Progress max={daysMax} value={daysPassed} />
      <CardDaysLeft>{daysLeftDisplay}</CardDaysLeft>
    </>
  );
};

const CardDaysLeft = styled.span`
  color: #999;
  font-size: 12px;
`;

const Progress = styled.progress`
  width: 100%;
  accent-color: ${violet.violet9};
`;

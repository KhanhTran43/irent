import moment from 'moment';

export function getStartDate() {
  return moment().startOf('days').format();
}

export function getEndDate(duration: number) {
  const today = moment(getStartDate()).add(Math.floor(duration * (365 / 12)) + 1, 'days');

  return today.format();
}

export function getDuration(startDate: string, endDate: string) {
  return moment(endDate).diff(moment(startDate), 'months');
}

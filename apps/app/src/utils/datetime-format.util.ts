import moment from 'moment';

export function convertISOtoLocaleDateFormat(date: string) {
  return moment(date).format('[ngày] DD [tháng] MM [năm] yyyy');
}

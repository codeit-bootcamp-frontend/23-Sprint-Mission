import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const date = (date) => {
  if (!date) return '';

  const d = new Date(date);

  return formatDistanceToNow(d, {
    addSuffix: true,
    locale: ko,
  });
};

export const formatDate = (date) => {
  if (!date) return '';
  return date.split('T')[0].replaceAll('-', '.');
};

export default date;

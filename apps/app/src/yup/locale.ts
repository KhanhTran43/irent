import { setLocale } from 'yup';

export function setupDefaultYupLocale() {
  setLocale({
    mixed: {
      required: 'Bắt buộc',
      notType: ({ path, type }) => {
        return `${path} phải là một ${type === 'number' ? 'số' : type}`;
      },
    },
    string: {
      min: '${path} cần nhiều hơn ${min} ký tự',
      max: '${path} cần ít hơn ${max} ký tự',
      length: '${path} cần phải chính xác ${length} chữ số',
    },
    number: {},
  });
}

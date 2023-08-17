import * as yup from 'yup';

export const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

yup.addMethod(yup.string, 'phone', function (message = 'Phone number is not valid') {
  return this.test('phone', message, (value) => value !== undefined && rePhoneNumber.test(value));
});

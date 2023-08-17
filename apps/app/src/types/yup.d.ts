export * from 'yup';

declare module 'yup' {
  class StringSchema {
    phone(message?: string): this;
  }
}

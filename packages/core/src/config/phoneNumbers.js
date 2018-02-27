export const FORMAT_BY_COUNTRY_CODE = {
  CY: {
    mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    regex: /^\d{2}-\d{6}$/,
  },
};

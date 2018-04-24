export const BY_COUNTRY = {
  CY: {
    name: 'Cyprus',
    callingCode: '+357',
    mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    regex: /^\d{2}-\d{6}$/,
  },
  GR: {
    name: 'Greece',
    callingCode: '+30',
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    regex: /^\d{3}-\d{7}$/,
  },
  PK: {
    name: 'Pakistan',
    callingCode: '+92',
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    regex: /^\d{3}-\d{7}$/,
  },
};

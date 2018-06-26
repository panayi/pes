import { isNilOrEmpty } from 'ramda-adjunct';
import { isValidNumber, formatNumber } from 'libphonenumber-js';

const getValidPhoneNumber = (phone, countryCode) => {
  if (isNilOrEmpty(phone)) {
    return null;
  }

  if (isValidNumber(phone)) {
    return phone;
  }

  const formattedNumber = formatNumber(
    {
      country: countryCode,
      phone,
    },
    'E.164',
  );

  if (isValidNumber(formattedNumber)) {
    return formattedNumber;
  }

  return null;
};

export default getValidPhoneNumber;

export const strongPasswordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const cellphoneRegex = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/
);

export const cellphoneMask = "(00) {9}0000-0000";

export const cpfMask = "000.000.000-00";

export const cnpjMask = "00.000.000/0000-00";

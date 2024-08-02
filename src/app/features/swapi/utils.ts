import { getString } from '../../utils/types';

export const getIdFromUrl = (url: string) => {
  const idText = url.split('/').filter(Boolean).pop();
  if (idText) {
    return parseInt(idText);
  }
  return 0;
};

export const parseNumber = (number: string) => {
  const num = parseFloat(getString(number).replace(/,/g, ''));
  return num || null;
};

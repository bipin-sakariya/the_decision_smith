import { IS_LOADING, RES_OPTION_SAVING, RES_FACTOR_SAVING } from './types';

export const startUniversalLoading = () => {
  return {
    type: IS_LOADING,
    payload: true
  };
};

export const startFactorSaving = () => {
  return {
    type: RES_FACTOR_SAVING,
    payload: true
  };
};

export const startOptionSaving = () => {
  return {
    type: RES_OPTION_SAVING,
    payload: true
  };
};

export const stopUniversalLoading = () => {
  return {
    type: IS_LOADING,
    payload: false
  };
};

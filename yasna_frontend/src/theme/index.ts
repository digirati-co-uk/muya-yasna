import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    brand: {
      orangeRed: '#FC6F42',
      darkOrangeRed: '#DF5815',
      orangeYellow: '#E79924',
      yellow: '#ECB431',
      black: '#192A37',
      charcoal: '#424243',
      white: '#FBFBFB',
    },
    grey: {
      darkGrey1: '#545559',
      darkGrey2: '#979797',
      lightGrey1: '#DADADA',
      lightGrey2: '#EEEEEE',
    },
    secondary: {
      success: '#41CC7B',
      information: '#1EA1FF',
      warning: '#F8BD1B',
      danger: '#FA4141',
    },
  },
  shadows: {
    topDown1: '0px 4px 40px rgba(0, 0, 0, 0.15)',
    topDown2: '0px 1px 6px rgba(130, 130, 130, 0.2)',
    topDown3: '0px 2px 6px rgba(41, 41, 41, 0.18)',
    topDown4: '0px 4px 12px rgba(41, 41, 41, 0.18)',
    wide1: '0px 0px 160px rgba(216, 216, 215, 0.5)',
    wide2: '0px 4px 4px rgba(0, 0, 0, 0.05), 0px 40px 180px rgba(217, 217, 210, 0.5)',
  },
  elevation: {
    '00dp': 'none',
    '01dp': '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    '02dp': '0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)',
    '03dp': '0px 3px 4px rgba(0, 0, 0, 0.14), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2)',
    '04dp': '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
    '06dp': '0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)',
    '08dp': '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    '09dp': '0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12), 0px 5px 6px rgba(0, 0, 0, 0.2)',
    '12dp': '0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2)',
    '16dp': '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    '24dp': '0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)',
  },
};

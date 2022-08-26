import 'styled-components';

type ElevationLevel = '00dp' | '01dp' | '02dp' | '03dp' | '04dp' | '06dp' | '08dp' | '09dp' | '12dp' | '16dp' | '24dp';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      brand: {
        orangeRed: string;
        darkOrangeRed: string;
        orangeYellow: string;
        yellow: string;
        black: string;
        charcoal: string;
        white: string;
      };
      grey: {
        darkGrey1: string;
        darkGrey2: string;
        lightGrey1: string;
        lightGrey2: string;
      };
      secondary: {
        success: string;
        information: string;
        warning: string;
        danger: string;
      };
    };
    shadows: {
      topDown1: string;
      topDown2: string;
      topDown3: string;
      topDown4: string;
      wide1: string;
      wide2: string;
    };
    elevation: Record<ElevationLevel, string>;
  }
}

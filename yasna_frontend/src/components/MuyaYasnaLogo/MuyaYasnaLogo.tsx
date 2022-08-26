import { LogoContainer} from './MuyaYasnaLogo.style';
import muya_yasna_logo from '../../assets/muya_yasna_logo_1000.png';

export function MuyaYasnaLogo() {
  return (
  <LogoContainer>
    <img src={muya_yasna_logo} alt="Logo of The Multimedia Yasna" style={{maxWidth: "20em"}} />
  </LogoContainer>
  );
}

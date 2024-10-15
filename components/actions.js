import {
  ButtonLayout,
  ButtonMenu,
  StyledActions,
} from '../styles/actionsStyles';
import ArchiveIcon from './icons/ArchiveIcon';
import MoreIcon from './icons/MoreIcon';

export default function Actions({ data }) {
  return (
    <>
      <StyledActions>
        <ButtonLayout>
          <ArchiveIcon />
        </ButtonLayout>
        <ButtonMenu>
          <MoreIcon />
        </ButtonMenu>
      </StyledActions>
    </>
  );
}

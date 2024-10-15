import styled from 'styled-components';

import { colors } from '../styles/theme';
import ArchiveIcon from './icons/ArchiveIcon';
import MoreIcon from './icons/MoreIcon';

const StyledActions = styled.div`
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin: 0 5px;

  border-radius: 32px;
  background: ${colors.lightGrey};
`;

const ButtonLayout = styled(Icon)``;

const ButtonMenu = styled(Icon)``;

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

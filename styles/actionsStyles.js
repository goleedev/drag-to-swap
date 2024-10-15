import styled from 'styled-components';

import { colors } from '../styles/theme';

export const StyledActions = styled.div`
  display: flex;
`;

export const Icon = styled.div`
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

export const ButtonLayout = styled(Icon)``;

export const ButtonMenu = styled(Icon)``;

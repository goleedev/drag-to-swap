import styled from 'styled-components';

import { size } from '../styles/theme';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: ${size.md};
  line-height: ${size.lg};
`;

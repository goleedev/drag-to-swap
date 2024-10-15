import styled from 'styled-components';

import { colors, spacing } from './theme';

export const Wrapper = styled.div`
  width: 600px;
  margin: auto;

  color: ${colors.grey};
`;

export const PrintWrapper = styled.div``;

export const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${spacing.lg};
  margin: 17px 0 42px;

  background: ${colors.blue};
  border-radius: 8px;
`;

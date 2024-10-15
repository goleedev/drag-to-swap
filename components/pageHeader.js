import styled from 'styled-components';

import { size } from '../styles/theme';
import Actions from './actions';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: ${size.md};
  line-height: ${size.lg};
`;

const PageHeader = ({ title }) => (
  <HeaderWrapper>
    <Title>{title}</Title>
    <Actions />
  </HeaderWrapper>
);

export default PageHeader;

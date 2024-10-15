import { HeaderWrapper, Title } from '../styles/pageHeaderStyles';
import Actions from './actions';

const PageHeader = ({ title }) => (
  <HeaderWrapper>
    <Title>{title}</Title>
    <Actions />
  </HeaderWrapper>
);

export default PageHeader;

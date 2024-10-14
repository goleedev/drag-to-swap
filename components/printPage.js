import Image from 'next/image';
import styled from 'styled-components';

import { colors, size, spacing } from '../styles/theme';
import Actions from './actions';

const Wrapper = styled.div`
  width: 600px;
  margin: auto;

  color: ${colors.grey};
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
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

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${spacing.lg};
  margin: 17px 0 42px;

  background: ${colors.blue};
  border-radius: 8px;
`;

const PrintPhoto = styled.div`
  width: calc(50% - 10px);

  img {
    max-width: ${size.full};
    height: auto;
    display: block;
  }
`;

export default function PrintPage({ data }) {
  return (
    <>
      <Wrapper>
        {Object.values(data).map((entry, i) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>

              <PageLayout>
                {entry.images.map((image) => {
                  return (
                    <PrintPhoto key={image}>
                      <Image
                        width={600}
                        height={400}
                        src={image}
                        alt=""
                        loading="eager"
                      />
                    </PrintPhoto>
                  );
                })}
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </>
  );
}

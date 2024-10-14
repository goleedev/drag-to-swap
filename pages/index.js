import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { colors, spacing } from '../styles/theme';

const Intro = styled.div`
  text-align: center;
  padding: 100px ${spacing.lg};

  h1 {
    margin-top: 50px;
  }

  a {
    display: inline-block;
    margin-top: 50px;
    padding: 12.5px 50px;

    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Intro>
          <Image src="/logo.svg" alt="Popsa" width="127" height="32" />
          <h1>Welcome to the React frontend test</h1>
          <Link href="/testpage">
            <a>Start test</a>
          </Link>
        </Intro>
      </div>
    </>
  );
}

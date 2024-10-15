import styled from 'styled-components';

import { colors, size } from '../styles/theme';

export const PrintPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - 10px);

  background-color: ${colors.lightGrey}60;
  cursor: pointer;
  transition: opacity 0.3s ease;
  overflow: hidden;
  opacity: ${({ $isDragging, hasUrl }) => ($isDragging && hasUrl ? 0.8 : 1)};

  img {
    display: block;
    max-width: ${size.full};
    height: auto;

    transition: opacity 0.8s ease;

    :hover {
      opacity: ${({ $isDragging, hasUrl }) =>
        $isDragging && hasUrl ? 1 : 0.5};
    }
  }
`;

export const DragPreview = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  overflow: hidden;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 5px solid ${colors.white};
  z-index: 100;
  pointer-events: none;
`;

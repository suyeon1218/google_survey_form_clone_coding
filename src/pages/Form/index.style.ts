import { Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
`;

export const Header = styled.header`
  width: 100%;
  height: 65px;
  display: flex;
  position: fixed;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  z-index: 2;
`;

export const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 65px);
  overflow-x: hidden;
  position: absolute;
  top: 65px;
  overflow: scroll;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.purple[50]};
`;

export const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const PreviewTooltip = styled(Tooltip)`
  border-radius: 5px;
`;

export const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  width: 100%;
  padding-bottom: 30px;
`;

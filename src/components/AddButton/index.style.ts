import { Card } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Card)`
  width: 50px;
  height: 50px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px;
  transition: 0.3s all ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
`;

import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Card, CardBody } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ContainerProps {
  isTitle: boolean;
  isError?: boolean;
}

export const Container = styled(Card)<ContainerProps>`
  box-sizing: border-box;
  max-width: 768px;
  width: 100%;
  margin: 10px 0px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: ${({ theme, isTitle }) =>
    isTitle === true ? `10px solid ${theme.colors.purple[600]}` : ''};
  border: ${({ theme, isError }) =>
    isError ? `1px solid ${theme.colors.red[500]}` : ''};
`;

export const Body = styled(CardBody)`
  width: 100%;
  padding: 10px 0px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
`;

export const RequiredMessage = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  height: 50px;
  align-items: center;
  color: ${({ theme }) => theme.colors.red[500]};
`;

export const RequiredIcon = styled.span`
  margin-left: 5px;
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.red[500]};
`;

export const ErrorIcon = styled(InfoOutlineIcon)`
  color: ${({ theme }) => theme.colors.red[500]};
`;

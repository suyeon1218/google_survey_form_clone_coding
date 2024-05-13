import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const EtcContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const EtcText = styled.span`
  width: 40px;
`;

export const EtcInput = styled(Input)`
  width: 100%;
  height: 20px;
  padding-left: 0px;
  border-radius: 0px;
  &:hover {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  }
  &:focus {
    outline: none;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.purple[500]}`};
  }
`;

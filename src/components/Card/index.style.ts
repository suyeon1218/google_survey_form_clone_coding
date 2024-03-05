import { Card, CardBody } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ContainerProps {
	isFocus: boolean;
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
	border-left: ${({ theme, isFocus }) =>
		isFocus === true ? `5px solid ${theme.colors.purple[600]}` : ``};
`;

export const Body = styled(CardBody)`
	width: 100%;
	padding: 10px 0px;
`;

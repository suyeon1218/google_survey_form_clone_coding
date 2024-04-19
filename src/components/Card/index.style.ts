import { Card, CardBody } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ContainerProps {
	isFocus: boolean;
	isTitle: boolean;
	isDragging?: boolean;
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
	border-left: ${({ theme, isFocus }) =>
		isFocus === true ? `5px solid ${theme.colors.blue[500]}` : ``};
	opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`;

export const Body = styled(CardBody)`
	width: 100%;
	padding: 10px 0px;
`;

export const RequiredMessage = styled.div`
	display: flex;
	gap: 5px;
	width: 100%;
	height: 50px;
	align-items: center;
	color: ${({ theme }) => theme.colors.red[500]};
`;

import { Card, CardBody } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ContainerProps {
	focus: string;
}

export const Container = styled(Card)<ContainerProps>`
	max-width: 768px;
	width: 100%;
	margin: 10px 0px;
	padding: 0px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-left: 2px solid ${({ theme }) => theme.colors.purple};
`;

export const Body = styled(CardBody)`
	width: 100%;
	padding: 10px 0px;
`;

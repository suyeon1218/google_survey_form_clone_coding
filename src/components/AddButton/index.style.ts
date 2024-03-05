import { Card } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Card)`
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin: 10px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray[50]};
	}
`;

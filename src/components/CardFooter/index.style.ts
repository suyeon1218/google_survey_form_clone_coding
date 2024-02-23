import { CardFooter } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Footer = styled(CardFooter)`
	width: 100%;
	height: 50px;
	border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
`;

export const IconContainer = styled.div`
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		border-radius: 100%;
		background-color: ${({ theme }) => theme.colors.gray[50]};
	}
`;

export const SwitchContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	gap: 10px;

	& > label {
		margin: 0px;
	}
`;

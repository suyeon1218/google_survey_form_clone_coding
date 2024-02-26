import { Input, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const InputContainer = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const OptionInput = styled(Input)`
	max-width: 300px;
	&:focus {
		outline: none;
		border-bottom: 2px solid ${({ theme }) => theme.colors.purple[500]};
	}
`;

export const DeleteButton = styled(Button)`
	width: 40px;
	height: 40px;
	background-color: ${({ theme }) => theme.colors.white};

	&: hover {
		border-radius: 100%;
		background-color: ${({ theme }) => theme.colors.gray[50]};
	}
`;

import { Input, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { OptionType } from '~/store';

interface InputContainerProps {
	isDragging: boolean;
}

interface OptionInputProps {
	type: 'etc' | 'normal';
}

export const InputContainer = styled.div<InputContainerProps>`
	height: 40px;
	display: flex;
	align-items: center;
	gap: 5px;
	opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`;

export const OptionInput = styled(Input)<OptionInputProps>`
	width: 100%;
	border-radius: 0px;
	&:focus {
		outline: none;
		border-bottom: 2px solid ${({ theme }) => theme.colors.purple[500]};
	}
	&:hover {
		border-bottom-width: 1px;
		border-bottom-style: ${({ type }) =>
			type === 'normal' ? 'solid' : 'dashed'};
		border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
	}
`;

export const DeleteButton = styled(Button)`
	width: 40px;
	height: 40px;
	background-color: ${({ theme }) => theme.colors.white};

	&:hover {
		border-radius: 100%;
		background-color: ${({ theme }) => theme.colors.gray[50]};
	}
`;

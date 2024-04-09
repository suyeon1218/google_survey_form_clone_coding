import { Input, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

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
	padding-left: 0px;
	border-radius: 0px;
	&:hover {
		border-bottom-width: 1px;
		border-bottom-style: ${({ type }) =>
			type === 'normal' ? 'solid' : 'dashed'};
		border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
	}
	&:focus {
		outline: none;
		border-bottom: ${({ type, theme }) =>
			type === 'normal' ? `2px solid ${theme.colors.purple[500]}` : ''};
	}
	&:read-only {
		border-bottom: none;
	}
`;

export const EtcInput = styled(Input)`
	width: 100%;
	padding-left: 0px;
	border-radius: 0px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-style: ${({ theme }) => theme.colors.gray[200]};
	&:focus {
		border-bottom: ${({ theme }) => `2px solid ${theme.colors.purple[500]}`};
	}
	&:read-only {
		border-bottom: none;
	}
`;

export const OptionText = styled.p`
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
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

export const EtcSpan = styled.span`
	width: 50px;
`;

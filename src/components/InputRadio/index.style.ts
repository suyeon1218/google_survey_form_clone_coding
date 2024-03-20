import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const OptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const OptionInput = styled(Input)`
	max-width: 300px;
	&:focus {
		outline: none;
		border-bottom: 2px solid ${({ theme }) => theme.colors.purple[500]};
	}
`;

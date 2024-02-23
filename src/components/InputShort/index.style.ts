import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const InputShort = styled(Input)`
	max-width: 300px;
	&:focus {
		outline: none;
		border-bottom: 2px solid ${({ theme }) => theme.colors.purple[500]};
	}
`;

import { CardHeader } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Header = styled(CardHeader)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 10px 0px;
	gap: 10px;

	${css`
		@media (max-width: 768px) {
			flex-direction: column;
		}
	`}

	& > div:nth-of-type(1) {
		flex-grow: 4;
		max-width: 450px;

		${css`
			@media (max-width: 768px) {
				flex-grow: 1;
				max-width: 100%;
			}
		`}
	}

	& > div:nth-of-type(2) {
		flex-grow: 1;
	}
`;

export const TitleTextContainer = styled.div`
	display: flex;
	gap: 5px;
`;

export const TitleText = styled.span``;

export const RequiredIcon = styled.span`
	color: ${({ theme }) => theme.colors.red[500]};
`;

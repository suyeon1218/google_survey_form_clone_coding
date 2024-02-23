import { Card, CardFooter, CardHeader, CardBody } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled(Card)`
	max-width: 768px;
	width: 100%;
	margin: 30px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Header = styled(CardHeader)`
	display: flex;
	justify-content: space-around;
	width: 100%;
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

export const Body = styled(CardBody)`
	width: 100%;
`;

export const Footer = styled(CardFooter)`
	width: 90%;
	border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

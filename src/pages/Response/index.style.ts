import { Button, Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100vw;
	margin: 0;
	padding: 0;
`;

export const Header = styled.header`
	width: 100%;
	height: 65px;
	display: flex;
	position: fixed;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const Main = styled.main`
	width: 100%;
	min-height: calc(100vh - 65px);
	overflow-x: hidden;
	position: absolute;
	top: 65px;
	overflow: scroll;
	display: flex;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.purple[50]};
`;

export const SubmitTooltip = styled(Tooltip)`
	border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
	position: absolute;
	right: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.purple[600]};
	color: ${({ theme }) => theme.colors.white};

	&:hover {
		background-color: ${({ theme }) => theme.colors.purple[400]};
	}
`;

export const CardsContainer = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 768px;
	width: 100%;
	padding-bottom: 30px;
`;

import { Card, CardBody } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Card)`
	max-width: 768px;
	width: 100%;
	margin: 30px 0px;
	padding: 0px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Body = styled(CardBody)`
	width: 100%;
	padding: 10px 0px;
`;

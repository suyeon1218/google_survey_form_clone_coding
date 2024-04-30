import { Card, CardBody, CardHeader } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CardType, RootStateType } from '~/store';
import * as S from './index.style';

interface Response {
	[key: string]: string | string[] | undefined;
}

interface Card {
	title: string;
	responses: (string | undefined)[];
}

const Result = () => {
	const location = useLocation();
	const cards = useSelector((state: RootStateType) => state.cards);
	const { state } = location;
	const response = state.response as Response;

	const cardData: Card[] = Object.entries(response).map(([cardId, values]) => {
		const targetCard = cards.find((card) => card.id === cardId) as CardType;
		const responses = Array.isArray(values) ? [...values] : [values];

		return {
			title: targetCard.title,
			responses
		};
	});

	return (
		<S.Container>
			{cardData.map((card) => {
				return (
					<Card>
						<CardHeader>{card.title}</CardHeader>
						<CardBody>
							{card.responses.map((response) => (
								<li>{response ? response : '선택하지 않은 답변입니다.'}</li>
							))}
						</CardBody>
					</Card>
				);
			})}
		</S.Container>
	);
};

export default Result;

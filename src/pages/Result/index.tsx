import { CardBody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
	const responses = state.responses as Response;

	const cardData: Card[] = Object.entries(responses).map(([cardId, values]) => {
		const targetCard = cards.find((card) => card.id === cardId) as CardType;
		const responses = Array.isArray(values) ? [...values] : [values];

		return {
			title: targetCard.title,
			responses
		};
	});

	return (
		<S.Container>
			<S.Header>
				<S.HomeButton>
					<Link to='/'>돌아가기</Link>
				</S.HomeButton>
			</S.Header>
			<S.Main>
				{cardData.map((card) => {
					return (
						<S.StyledCard>
							<S.StyledCardHeader>{card.title}</S.StyledCardHeader>
							<CardBody>
								{card.responses.map((response) => (
									<li>{response ? response : '선택하지 않은 답변입니다.'}</li>
								))}
							</CardBody>
						</S.StyledCard>
					);
				})}
			</S.Main>
		</S.Container>
	);
};

export default Result;

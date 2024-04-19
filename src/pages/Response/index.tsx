import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType } from '~/store';
import * as S from './index.style';
import ResponseCard from '~/components/ResponseCard';

const Response = () => {
	const cards = useSelector((state: RootStateType) => state.cards);

	return (
		<S.Container>
			<S.Header>
				<S.SubmitTooltip label='보내기'>
					<S.SubmitButton>
						<Link to='result'>보내기</Link>
					</S.SubmitButton>
				</S.SubmitTooltip>
			</S.Header>
			<S.Main>
				<S.CardsContainer>
					<DndProvider backend={HTML5Backend}>
						{cards.map((card, index) => (
							<ResponseCard
								key={card.id}
								id={card.id}
								index={index}
							/>
						))}
					</DndProvider>
				</S.CardsContainer>
			</S.Main>
		</S.Container>
	);
};

export default Response;

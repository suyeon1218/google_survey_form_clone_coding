import { ViewIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType, changeAuthority } from '~/store';
import * as S from './index.style';
import AddButton from '~/components/AddButton';
import Card from '~/components/Card';

const Response = () => {
	const cards = useSelector((state: RootStateType) => state.cards);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeAuthority());
	}, []);

	return (
		<S.Container>
			<S.Header>
				<S.PreviewTooltip label='미리보기'>
					<S.IconContainer>
						<ViewIcon
							boxSize={7}
							color={'grey'}
						/>
					</S.IconContainer>
				</S.PreviewTooltip>
			</S.Header>
			<S.Main>
				<S.CardsContainer>
					<DndProvider backend={HTML5Backend}>
						{cards.map((card, index) => (
							<Card
								key={card.id}
								id={card.id}
								index={index}
							/>
						))}
					</DndProvider>
				</S.CardsContainer>
				<AddButton />
			</S.Main>
		</S.Container>
	);
};

export default Response;

import { ViewIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType, initFocus } from '~/store';
import * as S from './index.style';
import AddButton from '~/components/AddButton';
import Card from '~/components/Card';

const Form = () => {
	const dispatch = useDispatch();
	const cards = useSelector(
		(state: RootStateType) => state.cards,
		shallowEqual
	);

	useEffect(() => {
		dispatch(initFocus());
	}, []);

	return (
		<S.Container>
			<S.Header>
				<S.PreviewTooltip label='미리보기'>
					<S.IconContainer>
						<Link to={'/response'}>
							<ViewIcon
								boxSize={7}
								color={'grey'}
							/>
						</Link>
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

export default Form;

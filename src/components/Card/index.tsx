import { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import OptionFields from '../OptionFields';
import TextField from '../TextField';
import {
	CardType,
	RootStateType,
	changeInputValue,
	dragCard,
	focus
} from './../../store/index';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface CardProps {
	id: string;
	index: number;
}

const Card = memo(({ id }: CardProps) => {
	const dispatch = useDispatch();
	const { type, isFocus } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			type: targetCard.type,
			isFocus: targetCard.isFocus
		};
	}, shallowEqual);

	const index = useSelector((state: RootStateType) => {
		const targetCardIndex = state.cards.findIndex((card) => card.id === id);

		return targetCardIndex;
	});

	const handleCardSort = (itemIndex: number, hoverIndex: number) => {
		dispatch(dragCard({ itemIndex, hoverIndex }));
	};

	const { dragRef, isDragging } = useDraggable({
		id: id,
		itemIndex: index,
		itemName: 'card',
		onDrag: handleCardSort
	});

	const handleClickCard = () => {
		dispatch(focus({ id }));
	};

	const handleChangeTitleExplain = (value: string) => {
		dispatch(changeInputValue({ cardId: id, value }));
	};

	return (
		<S.Container
			ref={id !== 'titleCard' ? dragRef : null}
			id={id}
			onClick={handleClickCard}
			isTitle={type === 'title'}
			isFocus={isFocus}
			isDragging={isDragging}>
			<CardHeader id={id} />
			<S.Body>
				{type === 'title' && (
					<TextField
						placeholder='설명을 입력해주세요'
						onChange={handleChangeTitleExplain}
					/>
				)}
				{(type === 'short' || type === 'long') && (
					<TextField
						placeholder='내 답변'
						readOnly={true}
					/>
				)}
				{(type === 'radio' || type === 'checkbox' || type === 'dropdown') && (
					<OptionFields id={id} />
				)}
			</S.Body>
			{type !== 'title' && isFocus && <CardFooter id={id} />}
		</S.Container>
	);
});

export default Card;

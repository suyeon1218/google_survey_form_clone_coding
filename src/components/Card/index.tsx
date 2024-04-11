import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import InputLong from '../InputLong';
import InputOption from '../InputOptions';
import InputShort from '../InputShort';
import { CardType, RootStateType, dragCard, focus } from './../../store/index';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface CardProps {
	id: string;
	index: number;
}

const Card = ({ id }: CardProps) => {
	const dispatch = useDispatch();
	const { type, errorMessage } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return targetCard;
	}, shallowEqual);
	const index = useSelector((state: RootStateType) => {
		const targetCardIndex = state.cards.findIndex((card) => card.id === id);

		return targetCardIndex;
	});

	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

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

	return (
		<S.Container
			ref={
				id !== 'titleCard' && typeof focusedCard === 'string' ? dragRef : null
			}
			id={id}
			onClick={handleClickCard}
			isTitle={type === 'title'}
			isError={errorMessage !== undefined && focusedCard === null}
			isFocus={focusedCard === id}
			isDragging={isDragging}>
			<CardHeader id={id} />
			<S.Body>
				{type === 'title' && (
					<InputLong
						id={id}
						placeholder={'설명을 작성해주세요'}
					/>
				)}
				{type === 'short' && <InputShort id={id} />}
				{type === 'long' && <InputLong id={id} />}
				{(type === 'radio' || type === 'checkbox' || type === 'dropdown') && (
					<InputOption id={id} />
				)}
			</S.Body>
			{type !== 'title' && focusedCard === id && <CardFooter id={id} />}
			{errorMessage && focusedCard === null && (
				<S.RequiredMessage>
					<InfoOutlineIcon />
					{errorMessage}
				</S.RequiredMessage>
			)}
		</S.Container>
	);
};

export default Card;

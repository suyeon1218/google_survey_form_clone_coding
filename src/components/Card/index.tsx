import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import InputLong from '../InputLong';
import InputOption from '../InputOption';
import InputShort from '../InputShort';
import { CardType, RootStateType, focus } from './../../store/index';
import * as S from './index.style';

interface CardProps {
	id: string;
	index: number;
}

const Card = ({ id }: CardProps) => {
	const dispatch = useDispatch();
	const { isFocused, type } = useSelector((state: RootStateType) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			isFocused: currentCard?.isFocused,
			type: currentCard?.type
		};
	}, shallowEqual);

	const handleClickCard = () => {
		dispatch(focus({ id }));
	};

	return (
		<S.Container
			id={isFocused ? 'focus' : ''}
			onClick={handleClickCard}
			isFocus={isFocused}>
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
			{type !== 'title' && isFocused && <CardFooter id={id} />}
		</S.Container>
	);
};

export default Card;

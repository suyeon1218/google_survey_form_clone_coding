import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import InputCheckBox from '../InputCheckBox';
import InputDropDown from '../InputDropDown';
import InputLong from '../InputLong';
import InputRadio from '../InputRadio';
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
				{type === 'title' && <InputLong placeholder={'설명을 작성해주세요'} />}
				{type === 'short' && <InputShort />}
				{type === 'long' && <InputLong />}
				{type === 'radio' && <InputRadio />}
				{type === 'checkbox' && <InputCheckBox />}
				{type === 'dropdown' && <InputDropDown />}
			</S.Body>
			{type !== 'title' && isFocused && <CardFooter />}
		</S.Container>
	);
};

export default Card;
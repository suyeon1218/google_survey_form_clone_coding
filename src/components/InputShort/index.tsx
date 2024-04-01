import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import * as S from './index.style';

interface InputShortProps {
	id: string;
}

const InputShort = ({ id }: InputShortProps) => {
	const dispatch = useDispatch();
	const option = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;
		const { options } = targetCard;

		return options[0];
	}, shallowEqual);
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

	const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		dispatch(changeInputValue({ cardId: id, optionId: option.id, value }));
	};

	return (
		<S.InputShort
			readOnly={focusedCard !== null}
			onChange={handleChangeValue}
			value={option.content}
			variant='flushed'
			placeholder='내 답변'
		/>
	);
};

export default InputShort;

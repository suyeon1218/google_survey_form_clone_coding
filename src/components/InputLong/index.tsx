import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import TextField from '../TextField';

interface InputLongProps {
	id: string;
	placeholder?: string;
}

const InputLong = ({ id, placeholder = '내 답변' }: InputLongProps) => {
	const dispatch = useDispatch();
	const option = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;
		const { options } = targetCard;

		return options[0];
	});
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

	const handleChangeValue = (value: string) => {
		dispatch(changeInputValue({ cardId: id, optionId: option.id, value }));
	};

	const editableTitleMode =
		typeof focusedCard === 'string' && id === 'titleCard';
	const editableLongInput = focusedCard === null && id !== 'titleCard';

	return (
		<TextField
			readOnly={!editableTitleMode && !editableLongInput}
			value={option.content}
			onChange={handleChangeValue}
			placeholder={placeholder}
		/>
	);
};

export default InputLong;

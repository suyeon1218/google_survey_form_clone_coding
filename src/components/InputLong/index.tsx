import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import TextField from '../TextField';

interface InputLongProps {
	id: string;
	placeholder?: string;
}

const InputLong = ({ id, placeholder = '내 답변' }: InputLongProps) => {
	const dispatch = useDispatch();
	const { option } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			option: targetCard.options[0]
		};
	}, shallowEqual);

	const handleChangeValue = (value: string) => {
		dispatch(changeInputValue({ cardId: id, optionId: option.id, value }));
	};

	return (
		<TextField
			readOnly={id === 'titleCard'}
			value={option.content}
			onChange={handleChangeValue}
			placeholder={id !== 'titleCard' ? placeholder : ''}
		/>
	);
};

export default InputLong;

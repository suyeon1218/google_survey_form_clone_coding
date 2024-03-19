import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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

	const handleChangeValue = (value: string) => {
		dispatch(changeInputValue({ cardId: id, optionId: option.id, value }));
	};

	return (
		<TextField
			value={option.content}
			onChange={handleChangeValue}
			placeholder={placeholder}
		/>
	);
};

export default InputLong;

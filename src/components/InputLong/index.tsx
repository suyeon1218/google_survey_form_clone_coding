import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import TextField from '../TextField';
import {} from 'react-redux';

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
	const authority = useSelector((state: RootStateType) => {
		return state.authority;
	}, shallowEqual);

	const handleChangeValue = (value: string) => {
		dispatch(changeInputValue({ cardId: id, optionId: option.id, value }));
	};

	return (
		<TextField
			readOnly={id !== 'titleCard' && authority !== 'write'}
			value={option.content}
			onChange={handleChangeValue}
			placeholder={placeholder}
		/>
	);
};

export default InputLong;

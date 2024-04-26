import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import TextField from '../TextField';

interface InputLongProps {
	id: string;
	placeholder?: string;
}

const InputLong = ({ id, placeholder = '내 답변' }: InputLongProps) => {
	const { required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			required: targetCard.required
		};
	}, shallowEqual);
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={id}
			rules={{ required }}
			render={({ field: { onChange, value } }) => (
				<TextField
					readOnly={id === 'titleCard'}
					value={value}
					onChange={onChange}
					placeholder={id !== 'titleCard' ? placeholder : ''}
				/>
			)}
		/>
	);
};

export default InputLong;

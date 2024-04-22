import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../TextField';

interface InputLongProps {
	id: string;
	placeholder?: string;
}

const InputLong = ({ id, placeholder = '내 답변' }: InputLongProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={id}
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

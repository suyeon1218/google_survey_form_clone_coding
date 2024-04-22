import { Controller, useFormContext } from 'react-hook-form';
import * as S from './index.style';

interface InputShortProps {
	id: string;
}

const InputShort = ({ id }: InputShortProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={id}
			control={control}
			render={({ field: { onChange } }) => (
				<S.InputShort
					onChange={onChange}
					variant='flushed'
					placeholder='내 답변'
				/>
			)}
		/>
	);
};

export default InputShort;

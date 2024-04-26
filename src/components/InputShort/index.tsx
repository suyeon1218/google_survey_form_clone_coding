import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { RootStateType, CardType } from '~/store';
import * as S from './index.style';

interface InputShortProps {
	id: string;
}

const InputShort = ({ id }: InputShortProps) => {
	const { required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			required: targetCard.required
		};
	}, shallowEqual);
	const { control } = useFormContext();

	return (
		<Controller
			name={id}
			control={control}
			rules={{ required }}
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

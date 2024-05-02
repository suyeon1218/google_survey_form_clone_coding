import { Stack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import DropDown from '../DropDown';

interface InputDropDownProps {
	id: string;
}

const InputDropDown = ({ id }: InputDropDownProps) => {
	const { control } = useFormContext();
	const { options, required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return { options: targetCard.options, required: targetCard.required };
	}, shallowEqual);

	const newOptions = useMemo(() => {
		const memo: { [key: string]: string } = {};

		options.forEach((option) => (memo[option.id] = option.content));

		return memo;
	}, [options]);

	return (
		<Stack direction={'column'}>
			<Controller
				name={id}
				control={control}
				rules={{
					required: {
						value: required,
						message: '필수 입력 값입니다.'
					}
				}}
				render={({ field: { onChange, onBlur } }) => (
					<DropDown
						menuList={newOptions}
						includeDefaultValue={true}
						onClick={(key: unknown) => {
							onChange(key ? key : undefined);
							onBlur();
						}}
					/>
				)}
			/>
		</Stack>
	);
};

export default InputDropDown;

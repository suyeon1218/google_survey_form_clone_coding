import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';

interface InputCheckbox {
	id: string;
}

const InputCheckbox = ({ id }: InputCheckbox) => {
	const { control } = useFormContext();
	const { options, required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return { options: targetCard.options, required: targetCard.required };
	}, shallowEqual);

	return (
		<Controller
			control={control}
			name={id}
			rules={{
				validate: (value) => {
					return !required || value.length > 0 || '필수 입력 값입니다.';
				}
			}}
			render={({ field: { onChange, onBlur } }) => (
				<CheckboxGroup onChange={onChange}>
					<Stack
						gap={3}
						direction={'column'}>
						{options.map((option) => (
							<Checkbox
								onChange={onBlur}
								colorScheme='purple'
								key={option.id}
								value={option.content}>
								{option.content}
							</Checkbox>
						))}
					</Stack>
				</CheckboxGroup>
			)}
		/>
	);
};

export default InputCheckbox;

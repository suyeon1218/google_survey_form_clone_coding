import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';

interface InputRadioProps {
	id: string;
}

const InputRadio = ({ id }: InputRadioProps) => {
	const { control } = useFormContext();
	const { options, required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return { options: targetCard.options, required: targetCard.required };
	}, shallowEqual);

	return (
		<Controller
			name={id}
			rules={{
				required: {
					value: required,
					message: '필수 입력 값입니다.'
				}
			}}
			control={control}
			defaultValue={required ? options[0].content : undefined}
			render={({ field: { onChange, value } }) => (
				<RadioGroup
					defaultValue={required ? options[0].id : undefined}
					value={value}
					onChange={onChange}>
					<Stack
						gap={3}
						direction={'column'}>
						{options.map((option) => (
							<Radio
								colorScheme='purple'
								key={option.id}
								value={option.content}>
								{option.content}
							</Radio>
						))}
					</Stack>
				</RadioGroup>
			)}
		/>
	);
};

export default InputRadio;

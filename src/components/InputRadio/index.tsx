import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';

interface InputRadioProps {
	id: string;
}

const InputRadio = ({ id }: InputRadioProps) => {
	const { control } = useFormContext();
	const { options } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return { options: targetCard.options };
	}, shallowEqual);

	return (
		<Controller
			name={id}
			control={control}
			render={({ field: { onChange, value } }) => (
				<RadioGroup
					value={value}
					onChange={onChange}>
					<Stack
						gap={3}
						direction={'column'}>
						{options.map((option) => (
							<Radio
								colorScheme='purple'
								key={option.id}
								value={option.id}>
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

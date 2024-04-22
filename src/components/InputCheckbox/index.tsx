import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CardType, RootStateType } from '~/store';

interface InputCheckbox {
	id: string;
}

const InputCheckbox = ({ id }: InputCheckbox) => {
	const { control } = useFormContext();
	const { options } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.cards.find(
			(card) => card.id === id
		) as CardType;

		return { options: targetCard.options };
	});

	return (
		<Controller
			control={control}
			name={id}
			render={({ field: { onChange, value } }) => (
				<CheckboxGroup
					onChange={onChange}
					value={value}>
					<Stack direction={'column'}>
						{options.map((option) => (
							<Checkbox
								colorScheme='purple'
								key={option.id}
								value={option.id}>
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

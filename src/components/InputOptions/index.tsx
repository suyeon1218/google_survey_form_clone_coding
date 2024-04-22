import { Stack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import DropDown from '../DropDown';

interface InputDropDownProps {
	id: string;
}

const InputDropDown = ({ id }: InputDropDownProps) => {
	const { control } = useFormContext();
	const { options } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.cards.find(
			(card) => card.id === id
		) as CardType;

		return { options: targetCard.options };
	}, shallowEqual);

	return (
		<Stack direction={'column'}>
			<Controller
				name={id}
				control={control}
				render={({ field: { onChange, value } }) => (
					<DropDown
						menuList={options.map((option) => option.content)}
						includeDefaultValue={true}
						defaultValue={value}
						onClick={onChange}
					/>
				)}
			/>
		</Stack>
	);
};

export default InputDropDown;

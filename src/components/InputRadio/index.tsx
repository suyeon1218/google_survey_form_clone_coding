import { RadioGroup, Radio } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import ChoiceInputBase from '../ChoiceInputBase';
import * as S from './index.style';

interface InputRadioProps {
	id: string;
}

const InputRadio = ({ id }: InputRadioProps) => {
	const [value, setValue] = useState('');
	// ! required 인 경우 value = 1, 아닐 경우 undefined
	// ! useArrayField 로 관리해서 없애야 한다
	const { options, isFocused } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;
		const { options, isFocused } = targetCard;

		return { options, isFocused };
	}, shallowEqual);

	const handleDelete = () => {};

	const handleTextChange = () => {};

	return (
		<RadioGroup
			onChange={setValue}
			value={value}>
			<S.OptionContainer>
				{options.map((option) => (
					<ChoiceInputBase
						key={option.id}
						onChange={handleTextChange}
						onDelete={handleDelete}
						value={option.content}
						deletable={options.length > 1}
						PrefixComponent={<Radio value={''} />}
					/>
				))}
				{isFocused && (
					<ChoiceInputBase
						PrefixComponent={<Radio />}
						value={''}
						isLastOption={true}
						deletable={false}
					/>
				)}
			</S.OptionContainer>
		</RadioGroup>
	);
};

export default InputRadio;

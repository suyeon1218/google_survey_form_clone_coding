import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import ChoiceInputBase from '../ChoiceInputBase';

const InputCheckBox = () => {
	return (
		<CheckboxGroup>
			<ChoiceInputBase PrefixComponent={<Checkbox />} />
		</CheckboxGroup>
	);
};

export default InputCheckBox;

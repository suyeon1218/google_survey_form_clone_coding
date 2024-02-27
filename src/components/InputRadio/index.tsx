import { RadioGroup, Radio } from '@chakra-ui/react';
import { useState } from 'react';
import ChoiceInputBase from '../ChoiceInputBase';

const InputRadio = () => {
	// ! required 인 경우 value = 1, 아닐 경우 undefined
	// ! useArrayField 로 관리해서 없애야 한다
	const [value, setValue] = useState<string | undefined>('');

	const handleDelete = () => {};

	const handleTextChange = () => {};

	return (
		<RadioGroup
			onChange={setValue}
			value={value}>
			<ChoiceInputBase
				onChange={handleTextChange}
				onDelete={handleDelete}
				PrefixComponent={<Radio value={''} />}
			/>
		</RadioGroup>
	);
};

export default InputRadio;

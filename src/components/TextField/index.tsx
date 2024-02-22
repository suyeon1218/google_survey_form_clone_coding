import { useEffect, useRef } from 'react';
import * as S from './index.style';

interface TextFieldProps {
	value: string;
}

const TextField = ({ value }: TextFieldProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChangeValue = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
	};

	useEffect(() => {
		handleChangeValue();
	}, []);

	return (
		<S.Container
			ref={textareaRef}
			onInput={handleChangeValue}
			defaultValue={value}></S.Container>
	);
};

export default TextField;

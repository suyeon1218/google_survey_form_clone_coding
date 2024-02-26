import { useEffect, useRef } from 'react';
import * as S from './index.style';

interface TextFieldProps {
	value?: string;
	isTitle?: boolean;
	placeholder?: string;
}

const TextField = ({
	value = '',
	isTitle = false,
	placeholder = ''
}: TextFieldProps) => {
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
		<S.Container>
			<S.TextArea
				rows={1}
				isTitle={isTitle}
				ref={textareaRef}
				placeholder={placeholder}
				onInput={handleChangeValue}
				defaultValue={value}></S.TextArea>
		</S.Container>
	);
};

export default TextField;

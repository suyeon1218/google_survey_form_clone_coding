import { ChangeEvent, useRef, useState } from 'react';
import * as S from './index.style';

interface TextFieldProps {
	value?: string;
	isTitle?: boolean;
	placeholder?: string;
	onChange?: (inputValue: string) => void;
	onBlur?: () => void;
	readOnly?: boolean;
}

const TextField = ({
	value,
	isTitle = false,
	placeholder = '',
	onChange,
	onBlur,
	readOnly = false
}: TextFieldProps) => {
	const [inputValue, setInputValue] = useState<string>(value ? value : '');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChangeinputValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
		if (onChange) {
			const { value } = event.target;
			setInputValue(value);
			onChange(value);
		}
	};

	return (
		<S.Container>
			<S.TextArea
				readOnly={readOnly}
				rows={1}
				isTitle={isTitle}
				ref={textareaRef}
				onBlur={onBlur}
				placeholder={placeholder}
				onChange={handleChangeinputValue}
				value={inputValue}></S.TextArea>
		</S.Container>
	);
};

export default TextField;

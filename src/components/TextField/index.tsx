import { ChangeEvent, useRef } from 'react';
import * as S from './index.style';

interface TextFieldProps {
	value?: string;
	isTitle?: boolean;
	placeholder?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	readOnly?: boolean;
}

const TextField = ({
	value = '',
	isTitle = false,
	placeholder = '',
	onChange,
	onBlur,
	readOnly = false
}: TextFieldProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
		if (onChange) {
			const { value } = event.target;
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
				onChange={handleChangeValue}
				value={value}></S.TextArea>
		</S.Container>
	);
};

export default TextField;

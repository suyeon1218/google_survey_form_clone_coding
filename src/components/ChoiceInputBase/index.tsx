import { CloseIcon } from '@chakra-ui/icons';
import * as S from './index.style';

interface ChoiceInputBaseProps {
	PrefixComponent?: JSX.Element | null;
	onChange?: () => void;
	onDelete?: () => void;
	deletable?: boolean;
	value?: string;
	placeholder?: string;
}

const ChoiceInputBase = ({
	PrefixComponent = null,
	deletable = true,
	onDelete = () => {},
	onChange = () => {},
	value = '',
	placeholder = ''
}: ChoiceInputBaseProps) => {
	return (
		<S.InputContainer>
			{PrefixComponent}
			<S.OptionInput
				onChange={onChange}
				value={value}
				variant='flushed'
				placeholder={placeholder}
			/>
			{deletable && (
				<S.DeleteButton onClick={onDelete}>
					<CloseIcon />
				</S.DeleteButton>
			)}
		</S.InputContainer>
	);
};

export default ChoiceInputBase;

import { CloseIcon } from '@chakra-ui/icons';
import * as S from './index.style';

interface ChoiceInputBaseProps {
	PrefixComponent: JSX.Element;
	deletable?: boolean;
	value?: string;
	placeholder?: string;
}

const ChoiceInputBase = ({
	PrefixComponent,
	deletable = true,
	value = '',
	placeholder = ''
}: ChoiceInputBaseProps) => {
	return (
		<S.InputContainer>
			{PrefixComponent}
			<S.OptionInput
				value={value}
				variant='flushed'
				placeholder={placeholder}
			/>
			{deletable && (
				<S.DeleteButton>
					<CloseIcon />
				</S.DeleteButton>
			)}
		</S.InputContainer>
	);
};

export default ChoiceInputBase;

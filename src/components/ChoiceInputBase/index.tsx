import { CloseIcon } from '@chakra-ui/icons';
import * as S from './index.style';

interface ChoiceInputBaseProps {
	PrefixComponent?: JSX.Element | null;
	onChange?: () => void;
	onDelete?: () => void;
	deletable?: boolean;
	value?: string;
	placeholder?: string;
	isLastOption?: boolean;
}

const ChoiceInputBase = ({
	PrefixComponent = null,
	deletable = true,
	onDelete = () => {},
	onChange = () => {},
	value = '',
	placeholder = '',
	isLastOption = false
}: ChoiceInputBaseProps) => {
	return (
		<S.InputContainer>
			{PrefixComponent}
			{isLastOption ? (
				<S.LastOptionContainer>
					<S.AddOptionButton>옵션 추가</S.AddOptionButton>
					또는
					<S.AddEtcButton>기타 추가</S.AddEtcButton>
				</S.LastOptionContainer>
			) : (
				<S.OptionInput
					onChange={onChange}
					value={value}
					variant='flushed'
					placeholder={placeholder}
				/>
			)}
			{deletable && (
				<S.DeleteButton onClick={onDelete}>
					<CloseIcon />
				</S.DeleteButton>
			)}
		</S.InputContainer>
	);
};

export default ChoiceInputBase;

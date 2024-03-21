import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addOption } from '~/store';
import * as S from './index.style';

interface ChoiceInputBaseProps {
	id: string;
	PrefixComponent?: JSX.Element | null;
	onChange?: () => void;
	onDelete?: () => void;
	deletable?: boolean;
	value?: string;
	placeholder?: string;
	isLastOption?: boolean;
}

const ChoiceInputBase = ({
	id,
	PrefixComponent = null,
	deletable = true,
	onDelete = () => {},
	onChange = () => {},
	value = '',
	placeholder = '',
	isLastOption = false
}: ChoiceInputBaseProps) => {
	const dispatch = useDispatch();

	const handleAddOption = () => {
		dispatch(addOption({ id }));
	};

	return (
		<S.InputContainer>
			{PrefixComponent}
			{isLastOption ? (
				<S.LastOptionContainer>
					<S.AddOptionButton onClick={handleAddOption}>
						옵션 추가
					</S.AddOptionButton>
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
					<CloseIcon
						color={'gray'}
						boxSize={3}
					/>
				</S.DeleteButton>
			)}
		</S.InputContainer>
	);
};

export default ChoiceInputBase;

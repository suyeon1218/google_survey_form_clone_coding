import { ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
	CardType,
	OptionType,
	RootStateType,
	changeInputValue,
	checkOption
} from '~/store';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';

interface InputOptionItemProps {
	cardId: string;
	optionId: string;
}

const InputOptionItem = ({ cardId, optionId }: InputOptionItemProps) => {
	const dispatch = useDispatch();

	const { option } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;
		const targetOption = targetCard.options.find(
			(option) => option.id === optionId
		) as OptionType;

		return {
			option: targetOption
		};
	}, shallowEqual);

	const handleCheckOption = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		dispatch(checkOption({ cardId, optionId }));
	};

	const handleChangeEtcValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		dispatch(changeInputValue({ cardId, optionId, value }));
	};

	return (
		<S.InputContainer>
			<S.OptionText
				data-option-id={option.id}
				onClick={handleCheckOption}>
				<OptionItemIcon
					cardId={cardId}
					optionId={optionId}
				/>
				{option.type === 'normal' ? option.content : '기타: '}
			</S.OptionText>
			{option.type === 'etc' && (
				<S.EtcInput
					type={'normal'}
					data-option-id={option.id}
					onChange={handleChangeEtcValue}
					value={option.content}
					variant='unstyle'
				/>
			)}
		</S.InputContainer>
	);
};

export default InputOptionItem;

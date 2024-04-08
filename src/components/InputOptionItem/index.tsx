import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, Radio } from '@chakra-ui/react';
import { ChangeEvent, MouseEvent } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
	checkOption,
	deleteOption,
	dragOption,
	inputOption
} from '~/store';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface InputOptionItemProps {
	cardId: string;
	optionId: string;
}

const InputOptionItem = ({ cardId, optionId }: InputOptionItemProps) => {
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	});
	const { option, isDeletable, cardType, optionIndex } = useSelector(
		(state: RootStateType) => {
			const targetCard = state.cards.find(
				(card) => card.id === cardId
			) as CardType;
			const targetOptionIndex = targetCard.options.findIndex(
				(option) => option.id === optionId
			);

			return {
				option: targetCard.options[targetOptionIndex],
				isDeletable: targetCard.options.length > 1,
				cardType: targetCard.type,
				optionIndex: targetOptionIndex
			};
		},
		shallowEqual
	);
	const handleDragOption = (itemIndex: number, hoverIndex: number) => {
		dispatch(dragOption({ cardId, itemIndex, hoverIndex }));
	};
	const { dragRef, isDragging } = useDraggable({
		id: optionId,
		itemName: 'option',
		itemIndex: optionIndex,
		onDrag: handleDragOption
	});

	const handleDeleteOption = () => {
		dispatch(deleteOption({ cardId, optionId }));
	};

	const handleInputOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		dispatch(inputOption({ cardId, optionId, value }));
	};

	const handleCheckOption = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (focusedCard === null) {
			dispatch(checkOption({ cardId, optionId }));
		}
	};

	return (
		<S.InputContainer
			ref={option.type === 'normal' ? dragRef : null}
			isDragging={isDragging}
			onClick={handleCheckOption}>
			{cardType === 'radio' && (
				<Radio
					isChecked={option.checked}
					isDisabled={focusedCard !== null}
				/>
			)}
			{cardType === 'checkbox' && (
				<Checkbox
					isChecked={option.checked}
					isDisabled={focusedCard !== null}
				/>
			)}
			{cardType === 'dropdown' && (
				<S.IndexContainer>{optionIndex + 1}</S.IndexContainer>
			)}
			{typeof focusedCard !== 'string' && option.type === 'etc' ? (
				<S.EtcSpan>기타:</S.EtcSpan>
			) : null}
			<S.OptionInput
				type={option.type}
				data-option-id={option.id}
				onInput={handleInputOptionValue}
				value={option.content}
				placeholder={option.type === 'etc' ? '기타...' : ''}
				variant='unstyle'
				readOnly={typeof focusedCard !== 'string' || option.type === 'etc'}
			/>
			{isDeletable && typeof focusedCard === 'string' && (
				<S.DeleteButton onClick={handleDeleteOption}>
					<CloseIcon
						color={'gray'}
						boxSize={3}
					/>
				</S.DeleteButton>
			)}
		</S.InputContainer>
	);
};

export default InputOptionItem;

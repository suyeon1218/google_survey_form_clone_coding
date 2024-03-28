import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, Radio } from '@chakra-ui/react';
import { ChangeEvent, MouseEvent } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
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
	const createAuthority = useSelector((state: RootStateType) => {
		return state.createAuthority;
	});
	const { option, isDeletable, type, optionIndex, isFocused } = useSelector(
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
				type: targetCard.type,
				optionIndex: targetOptionIndex,
				isFocused: targetCard.isFocused
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

	const handleDeleteOption = (event: MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLElement) {
			const { optionId } = event.target.dataset;

			dispatch(deleteOption({ cardId, optionId }));
		}
	};

	const handleInputOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target instanceof HTMLElement) {
			const { optionId } = event.target.dataset;
			const { value } = event.target;

			dispatch(inputOption({ cardId, optionId, value }));
		}
	};

	return (
		<S.InputContainer
			ref={dragRef}
			isDragging={isDragging}
			data-option-id={option.id}>
			{type === 'radio' && <Radio isDisabled={createAuthority === true} />}
			{type === 'checkbox' && (
				<Checkbox isDisabled={createAuthority === true} />
			)}
			{type === 'dropdown' && <div>{optionIndex + 1}</div>}
			<S.OptionInput
				data-option-id={option.id}
				onInput={handleInputOptionValue}
				value={option.content}
				variant='flushed'
			/>
			{isDeletable && isFocused && (
				<S.DeleteButton
					data-option-id={option.id}
					onClick={handleDeleteOption}>
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

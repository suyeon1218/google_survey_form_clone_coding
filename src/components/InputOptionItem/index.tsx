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
	const authority = useSelector((state: RootStateType) => {
		return state.authority;
	});
	const { option, isDeletable, cardType, optionIndex, isFocused } = useSelector(
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
			ref={option.type === 'normal' ? dragRef : null}
			isDragging={isDragging}
			data-option-id={option.id}>
			{cardType === 'radio' && <Radio isDisabled={authority !== 'write'} />}
			{cardType === 'checkbox' && (
				<Checkbox isDisabled={authority !== 'write'} />
			)}
			{cardType === 'dropdown' && (
				<S.IndexContainer>{optionIndex + 1}</S.IndexContainer>
			)}
			{authority !== 'create' && option.type === 'etc' ? (
				<span>기타:</span>
			) : null}
			<S.OptionInput
				type={option.type}
				data-option-id={option.id}
				onInput={handleInputOptionValue}
				value={option.content}
				placeholder={option.type === 'etc' ? '기타...' : ''}
				variant='unstyle'
				readOnly={authority === 'create' && option.type === 'etc'}
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

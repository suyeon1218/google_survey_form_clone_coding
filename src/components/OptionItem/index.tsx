import { CloseIcon } from '@chakra-ui/icons';
import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
	CardType,
	RootStateType,
	dragOption,
	inputOption,
	deleteOption
} from '~/store';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface OptionItemProps {
	cardId: string;
	optionId: string;
}

const OptionItem = ({ cardId, optionId }: OptionItemProps) => {
	const dispatch = useDispatch();
	const focusedCard = useSelector(
		(state: RootStateType) => state.focusedCard.id
	);
	const { option, optionIndex, isDeletable } = useSelector(
		(state: RootStateType) => {
			const targetCard = state.cards.find(
				(card) => card.id === cardId
			) as CardType;
			const targetOptionIndex = targetCard.options.findIndex(
				(option) => option.id === optionId,
				shallowEqual
			);

			return {
				option: targetCard.options[targetOptionIndex],
				optionIndex: targetOptionIndex,
				isDeletable: targetCard.options.length > 1
			};
		}
	);

	const handleChangeOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		dispatch(inputOption({ cardId, optionId, value }));
	};

	const handleDragOption = (itemIndex: number, hoverIndex: number) => {
		dispatch(dragOption({ cardId, itemIndex, hoverIndex }));
	};

	const handleDeleteOption = () => {
		dispatch(deleteOption({ cardId, optionId }));
	};

	const { dragRef, isDragging } = useDraggable({
		id: option.id,
		itemName: 'option',
		itemIndex: optionIndex,
		onDrag: handleDragOption
	});

	return (
		<S.InputContainer
			ref={option.type === 'normal' ? dragRef : null}
			isDragging={isDragging}>
			<OptionItemIcon
				cardId={cardId}
				optionId={optionId}
				isDisable={true}
			/>
			<S.OptionInput
				type={option.type}
				data-option-id={option.id}
				onChange={handleChangeOptionValue}
				value={option.content}
				placeholder={option.type === 'etc' ? '기타...' : ''}
				variant='unstyle'
				readOnly={option.type === 'etc'}
			/>
			{isDeletable && focusedCard === cardId && (
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

export default OptionItem;

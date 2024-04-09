import { CloseIcon } from '@chakra-ui/icons';
import { ChangeEvent, MouseEvent } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
	CardType,
	OptionType,
	RootStateType,
	checkOption,
	deleteOption,
	dragOption,
	inputOption
} from '~/store';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface InputOptionItemProps {
	cardId: string;
	optionId: string;
	optionIndex: number;
}

const InputOptionItem = ({
	cardId,
	optionId,
	optionIndex
}: InputOptionItemProps) => {
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	});
	const { option, isDeletable } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;
		const targetOption = targetCard.options.find(
			(option) => option.id === optionId
		) as OptionType;
		return {
			option: targetOption,
			isDeletable: targetCard.options.length > 1
		};
	}, shallowEqual);
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
			isDragging={isDragging}>
			{typeof focusedCard === 'string' ? (
				<>
					<OptionItemIcon
						cardId={cardId}
						optionId={optionId}
						optionIndex={optionIndex}
					/>
					<S.OptionInput
						type={option.type}
						data-option-id={option.id}
						onInput={handleInputOptionValue}
						value={option.content}
						placeholder={option.type === 'etc' ? '기타...' : ''}
						variant='unstyle'
						readOnly={
							typeof focusedCard !== 'string' ||
							(typeof focusedCard === 'string' && option.type === 'etc')
						}
					/>
				</>
			) : (
				<S.OptionText onClick={handleCheckOption}>
					<OptionItemIcon
						cardId={cardId}
						optionId={optionId}
						optionIndex={optionIndex}
					/>
					{option.type === 'normal' ? option.content : '기타: '}
				</S.OptionText>
			)}
			{focusedCard === null && option.type === 'etc' && (
				<S.EtcInput
					type={'normal'}
					data-option-id={option.id}
					onInput={handleInputOptionValue}
					value={option.content}
					variant='unstyle'
					readOnly={typeof focusedCard === 'string' && option.type === 'etc'}
				/>
			)}
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

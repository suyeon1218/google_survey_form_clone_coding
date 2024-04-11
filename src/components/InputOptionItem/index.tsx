import { ChangeEvent, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { CardMenuType, OptionType, RootStateType } from '~/store';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';
import useDraggable from '~/hooks/useDraggable';

interface InputOptionItemProps {
	option: OptionType;
	optionIndex: number;
	type: CardMenuType;
	onSelect: (event: MouseEvent<HTMLDivElement>) => void;
	onDrag: (itemIndex: number, hoverIndex: number) => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputOptionItem = ({
	option,
	optionIndex,
	type,
	onSelect,
	onDrag,
	onChange
}: InputOptionItemProps) => {
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	});

	const { dragRef, isDragging } = useDraggable({
		id: option.id,
		itemName: 'option',
		itemIndex: optionIndex,
		onDrag: onDrag
	});

	return (
		<S.InputContainer
			ref={
				option.type === 'normal' && typeof focusedCard === 'string'
					? dragRef
					: null
			}
			isDragging={isDragging}>
			{typeof focusedCard === 'string' ? (
				<>
					<OptionItemIcon
						type={type}
						isChecked={false}
						optionIndex={optionIndex}
					/>
					<S.OptionInput
						type={option.type}
						data-option-id={option.id}
						onChange={onChange}
						value={option.content}
						placeholder={option.type === 'etc' ? '기타...' : ''}
						variant='unstyle'
						readOnly={typeof focusedCard === 'string' && option.type === 'etc'}
					/>
				</>
			) : (
				<S.OptionText
					data-option-id={option.id}
					onClick={onSelect}>
					<OptionItemIcon
						type={type}
						isChecked={option.checked}
						optionIndex={optionIndex}
					/>
					{option.type === 'normal' ? option.content : '기타: '}
				</S.OptionText>
			)}
			{focusedCard === null && option.type === 'etc' && (
				<S.EtcInput
					type={'normal'}
					data-option-id={option.id}
					onChange={onChange}
					value={option.content}
					variant='unstyle'
					readOnly={typeof focusedCard === 'string' && option.type === 'etc'}
				/>
			)}
		</S.InputContainer>
	);
};

export default InputOptionItem;

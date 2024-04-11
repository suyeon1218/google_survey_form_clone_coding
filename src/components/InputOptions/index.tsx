import { CloseIcon } from '@chakra-ui/icons';
import { Stack } from '@chakra-ui/react';
import { useMemo, ChangeEvent, MouseEvent } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
	checkOption,
	deleteOption,
	dragOption,
	inputOption,
	addEtcOption,
	addOption
} from '~/store';
import DropDown from '../DropDown';
import InputOptionItem from '../InputOptionItem';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';

interface InputOptionsProps {
	id: string;
}

const InputOptions = ({ id }: InputOptionsProps) => {
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	});
	const { options, type } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			type: targetCard.type,
			options: targetCard.options
		};
	}, shallowEqual);
	const lastOption = useMemo(() => {
		return options[options.length - 1];
	}, [options]);

	const handleAddOption = () => {
		dispatch(addOption({ id }));
	};

	const handleEtcOption = () => {
		dispatch(addEtcOption({ id }));
	};

	const handleDragOption = (itemIndex: number, hoverIndex: number) => {
		dispatch(dragOption({ cardId: id, itemIndex, hoverIndex }));
	};

	const handleDeleteOption = (event: MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLElement) {
			const { optionId } = event.target.dataset;
			dispatch(deleteOption({ cardId: id, optionId }));
		}
	};

	const handleChangeOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target instanceof HTMLElement) {
			const { value } = event.target;
			const { optionId } = event.target.dataset;

			dispatch(inputOption({ cardId: id, optionId, value }));
		}
	};

	const handleCheckOption = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (focusedCard === null && event.target instanceof HTMLElement) {
			const { optionId } = event.currentTarget.dataset;
			dispatch(checkOption({ cardId: id, optionId }));
		}
	};

	const handleClickDropDownItem = (key: unknown) => {
		if (typeof key === 'string') {
			dispatch(checkOption({ cardId: id, optionId: options[Number(key)].id }));
		} else {
			dispatch(checkOption({ cardId: id, optionId: 'defaultOption' }));
		}
	};

	return (
		<Stack direction={'column'}>
			{focusedCard === null && type === 'dropdown' ? (
				<DropDown
					menuList={options.map((option) => option.content)}
					includeDefaultValue={true}
					defaultValue={undefined}
					onClick={handleClickDropDownItem}
				/>
			) : (
				options.map((option, index) => (
					<S.InputContainer>
						<InputOptionItem
							key={option.id}
							type={type}
							option={option}
							optionIndex={index}
							onSelect={handleCheckOption}
							onDrag={handleDragOption}
							onChange={handleChangeOptionValue}
						/>
						{options.length > 1 && focusedCard === id && (
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
				))
			)}
			{focusedCard === id && (
				<S.InputContainer>
					<OptionItemIcon
						type={type}
						isChecked={false}
						optionIndex={options.length}
					/>
					<S.LastOptionContainer>
						<S.AddOptionButton onClick={handleAddOption}>
							옵션 추가
						</S.AddOptionButton>
						{lastOption.type === 'normal' && type !== 'dropdown' && (
							<>
								<span>또는</span>
								<S.AddEtcButton onClick={handleEtcOption}>
									기타 추가
								</S.AddEtcButton>
							</>
						)}
					</S.LastOptionContainer>
				</S.InputContainer>
			)}
		</Stack>
	);
};

export default InputOptions;

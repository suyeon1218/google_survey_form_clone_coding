import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, Radio, Stack } from '@chakra-ui/react';
import { ChangeEvent, MouseEvent } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
	addOption,
	deleteOption,
	inputOption
} from './../../store/index';
import * as S from './index.style';

interface InputOptionProps {
	id: string;
}

const InputOption = ({ id }: InputOptionProps) => {
	const dispatch = useDispatch();
	const { options, type, isFocused } = useSelector((state: RootStateType) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			options: currentCard.options,
			type: currentCard.type,
			isFocused: currentCard.isFocused
		};
	}, shallowEqual);

	const handleDeleteOption = (event: MouseEvent<HTMLButtonElement>) => {
		if (event.target instanceof HTMLElement) {
			const { optionId } = event.target.dataset;

			dispatch(deleteOption({ cardId: id, optionId }));
		}
	};

	const handleAddOption = () => {
		dispatch(addOption({ id }));
	};

	const handleInputOptionValue = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target instanceof HTMLElement) {
			const { optionId } = event.target.dataset;
			const { value } = event.target;

			dispatch(inputOption({ cardId: id, optionId, value }));
		}
	};

	return (
		<Stack direction={'column'}>
			{options.map((option, index) => (
				<S.InputContainer data-option-id={option.id}>
					{type === 'radio' && <Radio />}
					{type === 'checkbox' && <Checkbox />}
					{type === 'dropdown' && <div>{index + 1}</div>}
					<S.OptionInput
						data-option-id={option.id}
						onInput={handleInputOptionValue}
						value={option.content}
						variant='flushed'
					/>
					{options.length > 1 && (
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
			))}
			{isFocused && (
				<S.LastOptionContainer>
					<S.AddOptionButton onClick={handleAddOption}>
						옵션 추가
					</S.AddOptionButton>
					<span>또는</span>
					<S.AddEtcButton>기타 추가</S.AddEtcButton>
				</S.LastOptionContainer>
			)}
		</Stack>
	);
};

export default InputOption;

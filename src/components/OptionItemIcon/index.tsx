import { Radio, Checkbox } from '@chakra-ui/react';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import * as S from './index.style';

interface OptionItemIcon {
	cardId: string;
	optionId?: string;
	optionIndex: number;
}

const OptionItemIcon = ({ cardId, optionId, optionIndex }: OptionItemIcon) => {
	const cardType = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;

		return targetCard.type;
	}, shallowEqual);
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);
	const option = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;
		const targetOption = targetCard.options.find(
			(option) => option.id === optionId
		);

		return targetOption;
	});

	return (
		<>
			{cardType === 'radio' && (
				<Radio
					isChecked={option ? option.checked : false}
					isDisabled={focusedCard !== null}
				/>
			)}
			{cardType === 'checkbox' && (
				<Checkbox
					isChecked={option ? option.checked : false}
					isDisabled={focusedCard !== null}
				/>
			)}
			{cardType === 'dropdown' && (
				<S.IndexContainer>{optionIndex + 1}</S.IndexContainer>
			)}
		</>
	);
};

export default OptionItemIcon;

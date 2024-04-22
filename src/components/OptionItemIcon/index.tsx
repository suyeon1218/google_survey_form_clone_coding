import { Radio, Checkbox } from '@chakra-ui/react';
import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import * as S from './index.style';

interface OptionItemIcon {
	cardId: string;
	optionId?: string;
	isDisable?: boolean;
	defaultIndex?: number;
}

const OptionItemIcon = ({
	cardId,
	optionId = undefined,
	isDisable = false,
	defaultIndex = undefined
}: OptionItemIcon) => {
	const type = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;

		return targetCard.type;
	});
	const { isChecked, optionIndex } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.id === cardId
		) as CardType;
		const optionIndex = targetCard.options.findIndex(
			(option) => option.id === optionId
		);

		return { isChecked: targetCard.options[optionIndex]?.checked, optionIndex };
	}, shallowEqual);

	return (
		<>
			{type === 'radio' && (
				<Radio
					isChecked={!!isChecked}
					isDisabled={isDisable}
				/>
			)}
			{type === 'checkbox' && (
				<Checkbox
					isChecked={!!isChecked}
					isDisabled={isDisable}
				/>
			)}
			{type === 'dropdown' && (
				<S.IndexContainer>
					{defaultIndex ? defaultIndex : optionIndex + 1}
				</S.IndexContainer>
			)}
		</>
	);
};

export default OptionItemIcon;

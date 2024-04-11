import { Radio, Checkbox } from '@chakra-ui/react';
import { useSelector, shallowEqual } from 'react-redux';
import { CardMenuType, RootStateType } from '~/store';
import * as S from './index.style';

interface OptionItemIcon {
	type: CardMenuType;
	isChecked: boolean;
	optionIndex: number;
}

const OptionItemIcon = ({ type, isChecked, optionIndex }: OptionItemIcon) => {
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

	return (
		<>
			{type === 'radio' && (
				<Radio
					isChecked={isChecked}
					isDisabled={focusedCard !== null}
				/>
			)}
			{type === 'checkbox' && (
				<Checkbox
					isChecked={isChecked}
					isDisabled={focusedCard !== null}
				/>
			)}
			{type === 'dropdown' && (
				<S.IndexContainer>{optionIndex + 1}</S.IndexContainer>
			)}
		</>
	);
};

export default OptionItemIcon;

import { Stack } from '@chakra-ui/react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { RootStateType, CardType } from '~/store';
import { addEtcOption, addOption } from '~/store';
import OptionItem from '../OptionItem';
import OptionItemIcon from '../OptionItemIcon';
import * as S from './index.style';

interface OptionFieldsProps {
	id: string;
}

const OptionFields = ({ id }: OptionFieldsProps) => {
	const dispatch = useDispatch();
	const { options, type, isFocus } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			options: targetCard.options,
			type: targetCard.type,
			isFocus: targetCard.isFocus
		};
	}, shallowEqual);
	const lastOption = options[options.length - 1];

	const handleAddOption = () => {
		dispatch(addOption({ id }));
	};

	const handleEtcOption = () => {
		dispatch(addEtcOption({ id }));
	};

	return (
		<Stack direction={'column'}>
			{options.map((option) => (
				<S.InputContainer key={option.id}>
					<OptionItem
						cardId={id}
						optionId={option.id}
					/>
				</S.InputContainer>
			))}
			{isFocus && (
				<S.InputContainer>
					<OptionItemIcon
						cardId={id}
						defaultIndex={options.length + 1}
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

export default OptionFields;

import { Stack, Radio, Checkbox } from '@chakra-ui/react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CardType, RootStateType, addOption } from '../../store/index';
import InputOptionItem from '../InputOptionItem';
import * as S from './index.style';

interface InputOptionsProps {
	id: string;
}

const InputOptions = ({ id }: InputOptionsProps) => {
	const dispatch = useDispatch();
	const createAuthority = useSelector((state: RootStateType) => {
		return state.createAuthority;
	});
	const { options, isFocused, type } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			type: targetCard.type,
			options: targetCard.options,
			isFocused: targetCard.isFocused
		};
	}, shallowEqual);

	const handleAddOption = () => {
		dispatch(addOption({ id }));
	};

	return (
		<Stack direction={'column'}>
			{options.map((option) => (
				<InputOptionItem
					cardId={id}
					optionId={option.id}
					key={option.id}
				/>
			))}
			{isFocused && (
				<S.InputContainer>
					{type === 'radio' && <Radio isDisabled={createAuthority === true} />}
					{type === 'checkbox' && (
						<Checkbox isDisabled={createAuthority === true} />
					)}
					{type === 'dropdown' && <div>{options.length + 1}</div>}
					<S.LastOptionContainer>
						<S.AddOptionButton onClick={handleAddOption}>
							옵션 추가
						</S.AddOptionButton>
						<span>또는</span>
						<S.AddEtcButton>기타 추가</S.AddEtcButton>
					</S.LastOptionContainer>
				</S.InputContainer>
			)}
		</Stack>
	);
};

export default InputOptions;

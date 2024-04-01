import { Stack, Radio, Checkbox } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
	addEtcOption,
	addOption
} from '../../store/index';
import InputOptionItem from '../InputOptionItem';
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

	return (
		<Stack direction={'column'}>
			{options.map((option) => (
				<InputOptionItem
					cardId={id}
					optionId={option.id}
					key={option.id}
				/>
			))}
			{focusedCard === id && (
				<S.InputContainer>
					{type === 'radio' && <Radio isDisabled={focusedCard !== 'write'} />}
					{type === 'checkbox' && (
						<Checkbox isDisabled={focusedCard !== 'write'} />
					)}
					{type === 'dropdown' && (
						<S.IndexContainer>{options.length + 1}</S.IndexContainer>
					)}
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

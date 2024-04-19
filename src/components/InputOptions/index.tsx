import { Stack } from '@chakra-ui/react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CardType, RootStateType, checkOption } from '~/store';
import DropDown from '../DropDown';
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

		return targetCard;
	}, shallowEqual);

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
				options.map((option) => (
					<S.InputContainer>
						<InputOptionItem
							key={option.id}
							cardId={id}
							optionId={option.id}
						/>
					</S.InputContainer>
				))
			)}
		</Stack>
	);
};

export default InputOptions;

import { AddIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CardType, RootStateType, addCard } from '~/store';
import * as S from './index.style';

const AddButton = () => {
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		const focusedCard = state.cards.find(
			(card) => card.isFocused === true
		) as CardType;

		return focusedCard;
	});

	const handleAddCard = () => {
		dispatch(addCard({ id: focusedCard.id }));
	};

	return (
		<S.Container onClick={handleAddCard}>
			<AddIcon />
		</S.Container>
	);
};

export default AddButton;

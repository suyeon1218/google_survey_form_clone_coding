import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardType, RootStateType, addCard } from '~/store';
import * as S from './index.style';

const AddButton = () => {
	const buttonRef = useRef<HTMLDivElement | null>();
	const dispatch = useDispatch();
	const focusedCardID = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find(
			(card) => card.isFocus === true
		) as CardType;

		return targetCard.id;
	});

	useEffect(() => {
		const $card = document.getElementById(`${focusedCardID}`);

		if (buttonRef.current && $card) {
			buttonRef.current.style.top = $card.offsetTop + 'px';
			buttonRef.current.style.left = $card.getBoundingClientRect().right + 'px';
		}
	}, [focusedCardID]);

	const handleAddCard = () => {
		dispatch(addCard({ id: focusedCardID }));
	};

	return (
		<S.Container
			ref={buttonRef}
			onClick={handleAddCard}>
			<AddIcon />
		</S.Container>
	);
};

export default AddButton;

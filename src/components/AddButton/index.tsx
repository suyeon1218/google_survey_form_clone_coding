import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CardType, RootStateType, addCard } from '~/store';
import * as S from './index.style';

const AddButton = () => {
	const buttonRef = useRef<HTMLDivElement | null>();
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		const focusedCard = state.cards.find(
			(card) => card.isFocused === true
		) as CardType;

		return focusedCard;
	});

	useEffect(() => {
		const $card = document.querySelector('#focus') as HTMLElement;

		if (buttonRef.current && $card) {
			buttonRef.current.style.top = $card.offsetTop + 'px';
			buttonRef.current.style.left = $card.getBoundingClientRect().right + 'px';
		}
	}, [focusedCard]);

	const handleAddCard = () => {
		dispatch(addCard({ id: focusedCard.id }));
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

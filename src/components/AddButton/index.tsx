import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootStateType, addCard } from '~/store';
import * as S from './index.style';

const AddButton = () => {
	const buttonRef = useRef<HTMLDivElement | null>();
	const dispatch = useDispatch();
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

	useEffect(() => {
		const $card = document.querySelector(`#${focusedCard}`) as HTMLElement;

		if (buttonRef.current && $card) {
			buttonRef.current.style.top = $card.offsetTop + 'px';
			buttonRef.current.style.left = $card.getBoundingClientRect().right + 'px';
		}
	}, [focusedCard]);

	const handleAddCard = () => {
		dispatch(addCard({ id: focusedCard }));
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

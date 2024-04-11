import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Divider, FormLabel, Switch } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import {
	CardType,
	RootStateType,
	copyCard,
	deleteCard,
	setRequired
} from '~/store';
import * as S from './index.style';

interface CardFooterProps {
	id: string;
}

const CardFooter = ({ id }: CardFooterProps) => {
	const dispatch = useDispatch();
	const required = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return targetCard.required;
	}, shallowEqual);

	const handleCopyCard = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		dispatch(copyCard({ id }));
	};

	const handleDeleteCard = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		dispatch(deleteCard({ id }));
	};

	const handleSetRequire = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();

		dispatch(setRequired({ id }));
	};

	return (
		<S.Footer>
			<S.IconContainer onClick={handleCopyCard}>
				<CopyIcon
					boxSize={5}
					color={'gray'}
				/>
			</S.IconContainer>
			<S.IconContainer onClick={handleDeleteCard}>
				<DeleteIcon
					boxSize={5}
					color={'gray'}
				/>
			</S.IconContainer>
			<Divider orientation='vertical' />
			<S.SwitchContainer onClick={handleSetRequire}>
				<FormLabel htmlFor='required'>필수</FormLabel>
				<Switch
					id='required'
					isChecked={required}
				/>
			</S.SwitchContainer>
		</S.Footer>
	);
};

export default CardFooter;

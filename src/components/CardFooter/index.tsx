import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Divider, FormLabel, Switch } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { copyCard, deleteCard } from '~/store';
import * as S from './index.style';

interface CardFooterProps {
	id: string;
}

const CardFooter = ({ id }: CardFooterProps) => {
	const dispatch = useDispatch();

	const handleCopyCard = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		dispatch(copyCard({ id }));
	};

	const handleDeleteCard = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		dispatch(deleteCard({ id }));
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
			<S.SwitchContainer>
				<FormLabel htmlFor='required'>필수</FormLabel>
				<Switch id='required' />
			</S.SwitchContainer>
		</S.Footer>
	);
};

export default CardFooter;

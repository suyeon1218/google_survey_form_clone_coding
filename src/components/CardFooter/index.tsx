import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Divider, FormLabel, Switch } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { copyCard } from '~/store';
import * as S from './index.style';

interface CardFooterProps {
	id: string;
}

const CardFooter = ({ id }: CardFooterProps) => {
	const dispatch = useDispatch();

	const handleClickCopy = () => {
		dispatch(copyCard({ id }));
	};

	return (
		<S.Footer>
			<S.IconContainer onClick={handleClickCopy}>
				<CopyIcon
					boxSize={5}
					color={'gray'}
				/>
			</S.IconContainer>
			<S.IconContainer>
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

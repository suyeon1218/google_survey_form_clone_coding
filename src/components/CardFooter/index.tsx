import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { Divider, FormLabel, Switch } from '@chakra-ui/react';
import * as S from './index.style';

const CardFooter = () => {
	return (
		<S.Footer>
			<S.IconContainer>
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

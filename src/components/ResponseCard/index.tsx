import { InfoOutlineIcon } from '@chakra-ui/icons';
import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CardHeader from '../CardHeader';
import InputLong from '../InputLong';
import InputOptions from '../InputOptions';
import InputShort from '../InputShort';
import { CardType, RootStateType } from './../../store/index';
import * as S from './index.style';

interface ResponseCardProps {
	id: string;
	index: number;
}

const ResponseCard = memo(({ id }: ResponseCardProps) => {
	const { type, errorMessage } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return targetCard;
	}, shallowEqual);

	return (
		<S.Container
			id={id}
			isTitle={type === 'title'}
			isError={errorMessage !== undefined}>
			<CardHeader id={id} />
			<S.Body>
				{type === 'title' && (
					<InputLong
						id={id}
						placeholder={'설명을 작성해주세요'}
					/>
				)}
				{type === 'short' && <InputShort id={id} />}
				{type === 'long' && <InputLong id={id} />}
				{(type === 'radio' || type === 'checkbox' || type === 'dropdown') && (
					<InputOptions id={id} />
				)}
			</S.Body>
			{errorMessage && (
				<S.RequiredMessage>
					<InfoOutlineIcon />
					{errorMessage}
				</S.RequiredMessage>
			)}
		</S.Container>
	);
});

export default ResponseCard;

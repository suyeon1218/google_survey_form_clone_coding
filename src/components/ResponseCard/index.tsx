import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
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
	const { type, title } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			type: targetCard.type,
			title: targetCard.title
		};
	}, shallowEqual);

	return (
		<S.Container
			id={id}
			isTitle={type === 'title'}>
			<S.Header>{title}</S.Header>
			<S.Body>
				{type === 'title' && <InputLong id={id} />}
				{type === 'short' && <InputShort id={id} />}
				{type === 'long' && <InputLong id={id} />}
				{(type === 'radio' || type === 'checkbox' || type === 'dropdown') && (
					<InputOptions id={id} />
				)}
			</S.Body>
		</S.Container>
	);
});

export default ResponseCard;

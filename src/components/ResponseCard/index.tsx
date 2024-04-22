import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import InputCheckbox from '../InputCheckbox';
import InputLong from '../InputLong';
import InputDropDown from '../InputOptions';
import InputRadio from '../InputRadio';
import InputShort from '../InputShort';
import { CardType, RootStateType } from './../../store/index';
import * as S from './index.style';

interface ResponseCardProps {
	id: string;
	index: number;
}

const ResponseCard = memo(({ id }: ResponseCardProps) => {
	const { type, title, required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.cards.find(
			(card) => card.id === id
		) as CardType;

		return {
			type: targetCard.type,
			title: targetCard.title,
			required: targetCard.required
		};
	}, shallowEqual);

	return (
		<S.Container
			id={id}
			isTitle={type === 'title'}>
			<S.Header>
				<S.RequiredIcon>{required ? '*' : ''}</S.RequiredIcon>
				{title}
			</S.Header>
			<S.Body>
				{type === 'title' && <InputLong id={id} />}
				{type === 'short' && <InputShort id={id} />}
				{type === 'long' && <InputLong id={id} />}
				{type === 'radio' && <InputRadio id={id} />}
				{type === 'checkbox' && <InputCheckbox id={id} />}
				{type === 'dropdown' && <InputDropDown id={id} />}
			</S.Body>
		</S.Container>
	);
});

export default ResponseCard;

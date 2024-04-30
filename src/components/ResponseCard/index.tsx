import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import InputCheckbox from '../InputCheckbox';
import InputDropDown from '../InputDropDown';
import InputLong from '../InputLong';
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
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			type: targetCard.type,
			title: targetCard.title,
			required: targetCard.required
		};
	}, shallowEqual);
	const { formState } = useFormContext();
	const { errors } = formState;

	return (
		<S.Container
			id={id}
			isError={!!errors[id]}
			isTitle={type === 'title'}>
			<S.Header>
				{title}
				<S.RequiredIcon>{required ? '*' : ''}</S.RequiredIcon>
			</S.Header>
			<S.Body>
				{type === 'title' && <InputLong id={id} />}
				{type === 'short' && <InputShort id={id} />}
				{type === 'long' && <InputLong id={id} />}
				{type === 'radio' && <InputRadio id={id} />}
				{type === 'checkbox' && <InputCheckbox id={id} />}
				{type === 'dropdown' && <InputDropDown id={id} />}
			</S.Body>
			{errors[id] && (
				<S.RequiredMessage>
					<S.ErrorIcon />
					필수 입력 값입니다.
				</S.RequiredMessage>
			)}
		</S.Container>
	);
});

export default ResponseCard;

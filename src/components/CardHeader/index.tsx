import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
	CardType,
	RootStateType,
	cardMenu,
	changeCardType,
	changeTitle
} from '~/store';
import DropDown from '../DropDown';
import TextField from '../TextField';
import * as S from './index.style';

interface CardHeaderProps {
	id: string;
}

const CardHeader = ({ id }: CardHeaderProps) => {
	const dispatch = useDispatch();
	const { title, type, required } = useSelector((state: RootStateType) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardType;
		return {
			title: currentCard.title,
			type: currentCard.type,
			required: currentCard.required
		};
	}, shallowEqual);
	const focusedCard = useSelector((state: RootStateType) => {
		return state.focusedCard.id;
	}, shallowEqual);

	const handleClickItem = (item: string) => {
		dispatch(changeCardType({ id, type: item }));
	};

	const handleChangeTitle = (value: string) => {
		dispatch(changeTitle({ id, value }));
	};

	return (
		<S.Header>
			{typeof focusedCard === 'string' && focusedCard === id ? (
				<TextField
					value={title}
					isTitle={focusedCard === id || type === 'title'}
					onChange={handleChangeTitle}
				/>
			) : (
				<S.TitleTextContainer>
					<S.TitleText>{title}</S.TitleText>
					{required && <S.RequiredIcon>*</S.RequiredIcon>}
				</S.TitleTextContainer>
			)}
			{typeof focusedCard === 'string' && type !== 'title' && (
				<DropDown
					menuList={cardMenu}
					defaultValue={cardMenu[type]}
					onClick={handleClickItem}
				/>
			)}
		</S.Header>
	);
};

export default CardHeader;

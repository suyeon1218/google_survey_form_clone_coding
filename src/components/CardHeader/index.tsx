import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType, cardMenu } from '~/store';
import DropDown from '../DropDown';
import TextField from '../TextField';
import * as S from './index.style';

interface CardHeaderProps {
	id: string;
}

const CardHeader = ({ id }: CardHeaderProps) => {
	const { title, type, isFocused } = useSelector((state: RootStateType) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardType;
		return {
			isFocused: currentCard?.isFocused,
			title: currentCard?.title,
			type: currentCard?.type
		};
	}, shallowEqual);

	return (
		<S.Header>
			<TextField
				value={title}
				isTitle={true}
			/>
			{type !== 'title' && isFocused && (
				<DropDown
					menuList={cardMenu}
					defaultValue={cardMenu[type]}
				/>
			)}
		</S.Header>
	);
};

export default CardHeader;

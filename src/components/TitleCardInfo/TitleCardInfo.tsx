import { useSelector, shallowEqual } from 'react-redux';
import { CardType, RootStateType } from '~/store';
import TextField from '../TextField';

interface TitleCardInfoProps {
	id: string;
}

const TitleCardInfo = ({ id }: TitleCardInfoProps) => {
	const { value } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return {
			value: targetCard.options[0].content
		};
	}, shallowEqual);

	return (
		<TextField
			value={value}
			readOnly={true}
		/>
	);
};

export default TitleCardInfo;

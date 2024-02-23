import { cardMenu, QuestionType } from '~/store';
import DropDown from '../DropDown';
import TextField from '../TextField';
import * as S from './index.style';

interface CardHeaderProps {
	title: string;
	type: QuestionType;
}

const CardHeader = ({ title, type }: CardHeaderProps) => {
	return (
		<S.Header>
			<TextField
				value={title}
				isTitle={true}
			/>
			<DropDown
				menuList={cardMenu}
				defaultValue={cardMenu[type]}
			/>
		</S.Header>
	);
};

export default CardHeader;

import DropDown from '../DropDown';
import TextField from '../TextField';
import { QuestionType, cardMenu } from './../../store/index';
import * as S from './index.style';

interface CardProps {
	title: string;
	type: QuestionType;
}

const Card = ({ title, type }: CardProps) => {
	return (
		<S.Container>
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
			<S.Body></S.Body>
			<S.Footer></S.Footer>
		</S.Container>
	);
};

export default Card;

import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import InputLong from '../InputLong';
import InputRadio from '../InputRadio';
import InputShort from '../InputShort';
import { QuestionType } from './../../store/index';
import * as S from './index.style';

interface CardProps {
	title: string;
	type: QuestionType;
}

const Card = ({ title, type }: CardProps) => {
	return (
		<S.Container>
			<CardHeader
				title={title}
				type={type}
			/>
			<S.Body>
				{type === 'short' && <InputShort />}
				{type === 'long' && <InputLong />}
				{type === 'radio' && <InputRadio />}
			</S.Body>
			<CardFooter />
		</S.Container>
	);
};

export default Card;

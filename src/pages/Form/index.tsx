import { ViewIcon } from '@chakra-ui/icons';
import * as S from './index.style';
import Card from '~/components/Card';

const Form = () => {
	return (
		<S.Container>
			<S.Header>
				<S.PreviewTooltip label='미리보기'>
					<S.IconContainer>
						<ViewIcon
							boxSize={7}
							color={'grey'}
						/>
					</S.IconContainer>
				</S.PreviewTooltip>
			</S.Header>
			<S.Main>
				<Card
					title='test'
					type='radio'
				/>
				<Card
					title='체크박스 input'
					type='checkbox'
				/>
			</S.Main>
		</S.Container>
	);
};

export default Form;

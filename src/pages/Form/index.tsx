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
					type='short'
				/>
				<Card
					title='test'
					type='long'
				/>
				<Card
					title='test'
					type='radio'
				/>
			</S.Main>
		</S.Container>
	);
};

export default Form;

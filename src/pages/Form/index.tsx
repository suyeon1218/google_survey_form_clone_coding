import { ViewIcon } from '@chakra-ui/icons';
import * as S from './index.style';

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
			<S.Main />
		</S.Container>
	);
};

export default Form;

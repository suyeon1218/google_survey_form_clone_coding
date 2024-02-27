import ChoiceInputBase from '../ChoiceInputBase';
import DropDown from '../DropDown';
import * as S from './index.style';

const InputDropDown = () => {
	const edit = false;
	// ! edit 상태이면 input, 아닌 경우 dropdown
	return edit ? (
		<DropDown menuList={['1', '2', '3']} />
	) : (
		<S.Container>
			<ChoiceInputBase PrefixComponent={<S.PrefixNumber>{1}</S.PrefixNumber>} />
		</S.Container>
	);
};

export default InputDropDown;

import { AddIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addCard } from '~/store';
import * as S from './index.style';

const AddButton = () => {
	const dispatch = useDispatch();

	const handleAddCard = () => {
		dispatch(addCard());
	};

	return (
		<S.Container onClick={handleAddCard}>
			<AddIcon />
		</S.Container>
	);
};

export default AddButton;

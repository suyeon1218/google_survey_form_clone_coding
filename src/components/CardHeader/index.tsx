import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  CardType,
  RootStateType,
  cardMenu,
  changeCardType,
  changeTitle
} from '~/store';
import DropDown from '../DropDown';
import TextField from '../TextField';
import * as S from './index.style';

interface CardHeaderProps {
  id: string;
}

const CardHeader = ({ id }: CardHeaderProps) => {
  const dispatch = useDispatch();
  const { title, type, required, isFocus } = useSelector(
    (state: RootStateType) => {
      const targetCard = state.cards.find((card) => card.id === id) as CardType;

      return {
        title: targetCard.title,
        type: targetCard.type,
        required: targetCard.required,
        isFocus: targetCard.isFocus
      };
    },
    shallowEqual
  );

  const handleClickItem = (item: unknown) => {
    dispatch(changeCardType({ id, type: item }));
  };

  const handleChangeTitle = (value: string) => {
    dispatch(changeTitle({ id, value }));
  };

  return (
    <S.Header>
      {isFocus ? (
        <TextField
          value={title}
          isTitle={type === 'title'}
          onChange={handleChangeTitle}
        />
      ) : (
        <S.TitleTextContainer>
          <S.TitleText>{title}</S.TitleText>
          {required && <S.RequiredIcon>*</S.RequiredIcon>}
        </S.TitleTextContainer>
      )}
      {isFocus && type !== 'title' && (
        <DropDown
          menuList={cardMenu}
          defaultValue={cardMenu[type]}
          onClick={handleClickItem}
        />
      )}
    </S.Header>
  );
};

export default CardHeader;

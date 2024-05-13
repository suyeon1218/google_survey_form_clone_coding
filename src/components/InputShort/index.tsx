import { useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { RootStateType, CardType } from '~/store';
import * as S from './index.style';

interface InputShortProps {
  id: string;
}

const InputShort = ({ id }: InputShortProps) => {
  const { required } = useSelector((state: RootStateType) => {
    const targetCard = state.cards.find((card) => card.id === id) as CardType;

    return {
      required: targetCard.required
    };
  }, shallowEqual);
  const { register } = useFormContext();

  return (
    <S.InputShort
      {...register(id, {
        validate: (value) =>
          !required || value.length > 0 || '필수 입력 값입니다.'
      })}
      variant='flushed'
      placeholder='내 답변'
    />
  );
};

export default InputShort;

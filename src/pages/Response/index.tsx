import { FormEvent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStateType } from '~/store';
import * as S from './index.style';
import ResponseCard from '~/components/ResponseCard';

const Response = () => {
  const cards = useSelector((state: RootStateType) => state.cards);
  const methods = useForm({ mode: 'onBlur' });
  const navigate = useNavigate();

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { getValues, trigger, formState } = methods;
    const values = getValues();
    const cardId = Object.keys(values);

    for (const id of cardId) {
      if ((await trigger(id)) === false) {
        const targetCard = document.getElementById(id) as HTMLElement;
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        return;
      }
    }

    if (Object.entries(formState.errors).length === 0) {
      navigate('/result', { state: { responses: values } });
    }
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmitForm}>
        <S.Header>
          <S.SubmitTooltip label='보내기'>
            <S.SubmitButton type='submit'>보내기</S.SubmitButton>
          </S.SubmitTooltip>
        </S.Header>
        <S.Main>
          <S.CardsContainer>
            <DndProvider backend={HTML5Backend}>
              <FormProvider {...methods}>
                {cards.map((card, index) => (
                  <ResponseCard
                    key={card.id}
                    id={card.id}
                    index={index}
                  />
                ))}
              </FormProvider>
            </DndProvider>
          </S.CardsContainer>
        </S.Main>
      </form>
    </S.Container>
  );
};

export default Response;

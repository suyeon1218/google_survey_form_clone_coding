import { CardBody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CardType, RootStateType } from '~/store';
import * as S from './index.style';

interface Response {
  [key: string]: string | string[] | undefined;
}

interface Card {
  id: string;
  title: string;
  responses: (string | undefined)[];
}

const Result = () => {
  const location = useLocation();
  const cards = useSelector((state: RootStateType) => state.cards);
  const { state } = location;
  const responses = state.responses as Response;

  const cardData: Card[] = Object.entries(responses).map(([cardId, values]) => {
    const targetCard = cards.find((card) => card.id === cardId) as CardType;
    const responses: (string | undefined)[] = [];
    const { options } = targetCard;

    if (values === undefined) {
      responses.push(undefined);
    } else if (typeof values === 'string') {
      if (targetCard.type === 'long' || targetCard.type === 'short') {
        responses.push(values);
      } else {
        for (let i = 0; i < options.length; i++) {
          if (options[i].id === values) {
            responses.push(options[i].content);
            break;
          }
        }
      }
    } else {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (options[j].id === values[i]) {
            responses.push(options[j].content);
            break;
          }
        }
      }
    }

    return {
      id: cardId,
      title: targetCard.title,
      responses
    };
  });

  return (
    <S.Container>
      <S.Header>
        <S.HomeButton>
          <Link to='/'>돌아가기</Link>
        </S.HomeButton>
      </S.Header>
      <S.Main>
        {cardData.map((card) => {
          return (
            <S.StyledCard key={card.id}>
              <S.StyledCardHeader>{card.title}</S.StyledCardHeader>
              <CardBody>
                {card.responses.map((response) => (
                  <li>{response ? response : '선택하지 않은 답변입니다.'}</li>
                ))}
              </CardBody>
            </S.StyledCard>
          );
        })}
      </S.Main>
    </S.Container>
  );
};

export default Result;

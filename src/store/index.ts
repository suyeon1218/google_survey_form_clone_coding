import { configureStore, createSlice } from '@reduxjs/toolkit';

export const cardMenu = {
  short: '단답형',
  long: '장문형',
  radio: '객관식 질문',
  checkbox: '체크박스',
  dropdown: '드롭다운'
};

export type CardMenuType = keyof typeof cardMenu | 'title';

export type CardsType = CardType[];

export interface CardType {
  id: string;
  title: string;
  type: CardMenuType;
  required: boolean;
  isFocus: boolean;
  options: OptionType[];
}

export interface OptionType {
  id: string;
  type: 'normal' | 'etc';
  content: string;
}

const baseOption: Omit<OptionType, 'id'> = {
  content: '옵션1',
  type: 'normal'
};

const baseCard: Omit<CardType, 'id' | 'options'> = {
  title: '제목없는 질문',
  type: 'radio',
  required: false,
  isFocus: true
};

const titleCard: CardType = {
  ...baseCard,
  id: 'titleCard',
  title: '제목 없는 설문지',
  type: 'title',
  options: [{ ...baseOption, content: '', id: generateID() }]
};

function generateID() {
  return Math.random().toString(36).substring(2, 16);
}

const initialCards: CardsType = [
  titleCard,
  {
    ...baseCard,
    id: generateID(),
    isFocus: false,
    options: [{ ...baseOption, id: generateID() }]
  }
];

const cardSlice = createSlice({
  name: 'card',
  initialState: initialCards,
  reducers: {
    addCard: (state, action) => {
      const { id } = action.payload;
      const targetCardIndex = state.findIndex((card) => card.id === id);
      const nextState = state.map((card) => ({ ...card, isFocus: false }));
      const newCard: CardType = {
        ...baseCard,
        id: generateID(),
        options: [{ ...baseOption, id: generateID() }]
      };

      nextState.splice(targetCardIndex + 1, 0, newCard);

      return nextState;
    },
    changeCardType: (state, action) => {
      const { id, type } = action.payload;
      const targetCard = state.find((card) => card.id === id) as CardType;

      if (
        (targetCard.type === 'long' || targetCard.type === 'short') &&
        (type === 'radio' || type === 'checkbox' || type === 'dropdown')
      ) {
        targetCard.options = [{ ...baseOption, id: generateID() }];
      } else if (
        (targetCard.type === 'radio' ||
          targetCard.type === 'checkbox' ||
          targetCard.type === 'dropdown') &&
        (type === 'long' || type === 'short')
      ) {
        targetCard.options = [{ ...baseOption, content: '', id: generateID() }];
      } else if (
        (targetCard.type === 'radio' || targetCard.type === 'checkbox') &&
        type === 'dropdown'
      ) {
        const lastOptionType =
          targetCard.options[targetCard.options.length - 1].type;

        if (lastOptionType === 'etc') {
          targetCard.options.pop();
        }
      }
      targetCard.type = type;
    },
    changeTitle: (state, action) => {
      const { id, value } = action.payload;
      const targetCard = state.find((card) => card.id === id) as CardType;

      targetCard.title = value;
    },
    changeInputValue: (state, action) => {
      const { cardId, optionId, value } = action.payload;
      const targetCard = state.find((card) => card.id === cardId) as CardType;

      if (optionId === undefined) {
        targetCard.options[0].content = value;
      } else {
        const option = targetCard.options.find(
          (option) => option.id === optionId
        ) as OptionType;

        option.content = value;
      }
    },
    copyCard: (state, action) => {
      const { id } = action.payload;
      const nextCard = state.map((card) => ({ ...card, isFocus: false }));
      const targetCardIndex = state.findIndex((card) => card.id === id);
      const newCard: CardType = {
        ...state[targetCardIndex],
        id: generateID()
      };

      nextCard.splice(targetCardIndex + 1, 0, newCard);

      return nextCard;
    },
    deleteCard: (state, action) => {
      const { id } = action.payload;
      const cardIndex = state.findIndex((card) => card.id === id);
      const nextState = state.map((card, index) => ({
        ...card,
        isFocus: index === cardIndex - 1 ? true : false
      }));
      nextState.splice(cardIndex, 1);

      return nextState;
    },
    setRequired: (state, action) => {
      const { id } = action.payload;
      const targetCard = state.find((card) => card.id === id) as CardType;

      targetCard.required = !targetCard.required;
    },
    addOption: (state, action) => {
      const { id } = action.payload;
      const targetCard = state.find((card) => card.id === id) as CardType;
      const lastOption = targetCard.options[targetCard.options.length - 1];

      if (lastOption.type === 'etc') {
        targetCard.options.pop();
      }

      targetCard.options.push({
        ...baseOption,
        content: `옵션${targetCard.options.length + 1}`,
        id: generateID()
      });

      if (lastOption.type === 'etc') {
        targetCard.options.push(lastOption);
      }
    },
    deleteOption: (state, action) => {
      const { cardId, optionId } = action.payload;
      const targetCard = state.find((card) => card.id === cardId) as CardType;
      const targetOptionIndex = targetCard.options.findIndex(
        (option) => option.id === optionId
      );

      targetCard.options.splice(targetOptionIndex, 1);
    },
    inputOption: (state, action) => {
      const { cardId, optionId, value } = action.payload;
      const targetCard = state.find((card) => card.id === cardId) as CardType;
      const targetOption = targetCard.options.find(
        (option) => option.id === optionId
      ) as OptionType;

      targetOption.content = value;
    },
    dragCard: (state, action) => {
      const { itemIndex, hoverIndex } = action.payload;
      const nextState = [...state];
      const changeCard = state[itemIndex];

      nextState.splice(itemIndex, 1);
      nextState.splice(hoverIndex, 0, changeCard);

      return nextState;
    },
    dragOption: (state, action) => {
      const { cardId, itemIndex, hoverIndex } = action.payload;
      const targetCard = state.find((card) => card.id === cardId) as CardType;
      const nextOption = [...targetCard.options];
      const changeOption = nextOption[itemIndex];

      nextOption.splice(itemIndex, 1);
      nextOption.splice(hoverIndex, 0, changeOption);
      targetCard.options = nextOption;
    },
    addEtcOption: (state, action) => {
      const { id } = action.payload;
      const targetCard = state.find((card) => card.id === id) as CardType;

      targetCard.options.push({
        ...baseOption,
        type: 'etc',
        id: generateID(),
        content: ''
      });
    },
    focus: (state, action) => {
      const { id } = action.payload;
      const nextState = state.map((card) => ({
        ...card,
        isFocus: card.id === id ? true : false
      }));

      return nextState;
    }
  }
});

const store = configureStore({
  reducer: {
    cards: cardSlice.reducer
  }
});

export type RootStateType = ReturnType<typeof store.getState>;
export const {
  addCard,
  changeCardType,
  changeTitle,
  changeInputValue,
  copyCard,
  deleteCard,
  setRequired,
  addOption,
  deleteOption,
  inputOption,
  dragCard,
  dragOption,
  addEtcOption,
  focus
} = cardSlice.actions;

export default store;

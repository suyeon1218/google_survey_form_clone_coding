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
	isFocused: boolean;
	title: string;
	type: CardMenuType;
	required: boolean;
	options: OptionType[];
}

export interface OptionType {
	id: string;
	content: string;
	checked: boolean;
}

const baseOption: OptionType = {
	id: generateID(),
	content: '옵션 1',
	checked: false
};

const titleCard: CardType = {
	id: 'titleQuestion',
	title: '제목 없는 설문지',
	isFocused: true,
	type: 'title',
	required: false,
	options: [{ ...baseOption, content: '' }]
};

function generateID() {
	return Math.random().toString(36).substring(2, 16);
}

const initialCards: CardsType = [titleCard];

const cardSlice = createSlice({
	name: 'card',
	initialState: initialCards,
	reducers: {
		focus: (state, action) => {
			const { id } = action.payload;
			const nextState = state.map((card) => ({
				...card,
				isFocused: id === card.id ? true : false
			}));

			return nextState;
		},
		addCard: (state, action) => {
			const nextState = state.map((card) => ({ ...card, isFocused: false }));
			const { id } = action.payload;
			const insertIndex = nextState.findIndex((card) => card.id === id);
			const newCard: CardType = {
				id: generateID(),
				title: '제목없는 질문',
				type: 'radio',
				required: false,
				isFocused: true,
				options: [{ ...baseOption }]
			};

			nextState.splice(insertIndex + 1, 0, newCard);

			return nextState;
		},
		changeCardType: (state, action) => {
			const { id, type } = action.payload;
			const targetCard = state.find((card) => card.id === id) as CardType;

			if (
				(targetCard.type === 'long' || targetCard.type === 'short') &&
				(type === 'radio' || type === 'checkbox' || type === 'dropdown')
			) {
				targetCard.options?.push({ ...baseOption });
			} else if (
				(targetCard.type === 'radio' ||
					targetCard.type === 'checkbox' ||
					targetCard.type === 'dropdown') &&
				(type === 'long' || type === 'short')
			) {
				targetCard.options = [{ ...baseOption }];
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
			const option = targetCard.options.find(
				(option) => option.id === optionId
			) as OptionType;

			option.content = value;
		}
	}
});

const store = configureStore({
	reducer: {
		cards: cardSlice.reducer
	}
});

export type RootStateType = ReturnType<typeof store.getState>;
export const { focus, addCard, changeCardType, changeTitle, changeInputValue } =
	cardSlice.actions;

export default store;

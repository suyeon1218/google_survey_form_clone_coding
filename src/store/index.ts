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
	options?: OptionType[];
}

export interface OptionType {
	id: string;
	content: string;
	checked: boolean;
}

const titleCard: CardType = {
	id: 'titleQuestion',
	title: '제목 없는 설문지',
	isFocused: true,
	type: 'title',
	required: false
};

const initialCards: CardsType = [titleCard];

const cardSlice = createSlice({
	name: 'card',
	initialState: initialCards,
	reducers: {
		focusCard: (state, action) => {
			const nextState = state.map((card) => ({ ...card, isFocused: false }));
		}
	}
});

const store = configureStore({
	reducer: {
		cards: cardSlice.reducer
	}
});

export type RootStateType = ReturnType<typeof store.getState>;

export default store;

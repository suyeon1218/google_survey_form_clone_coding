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

const baseOption: Omit<OptionType, 'id'> = {
	content: '옵션 1',
	checked: false
};

const baseCard: Omit<CardType, 'id' | 'options'> = {
	title: '제목없는 질문',
	type: 'radio',
	required: false,
	isFocused: false
};

const titleCard: CardType = {
	...baseCard,
	id: 'titleCard',
	title: '제목 없는 설문지',
	type: 'title',
	isFocused: true,
	options: [{ ...baseOption, content: '', id: generateID() }]
};

const getCreateAuthority = () => {
	const { pathname } = location;

	return pathname === '/' ? true : false;
};

function generateID() {
	return Math.random().toString(36).substring(2, 16);
}

const initialCards: CardsType = [
	titleCard,
	{
		...baseCard,
		id: generateID(),
		options: [{ ...baseOption, id: generateID() }]
	}
];

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
				...baseCard,
				id: generateID(),
				options: [{ ...baseOption, id: generateID() }]
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
				targetCard.options?.push({ ...baseOption, id: generateID() });
			} else if (
				(targetCard.type === 'radio' ||
					targetCard.type === 'checkbox' ||
					targetCard.type === 'dropdown') &&
				(type === 'long' || type === 'short')
			) {
				targetCard.options = [{ ...baseOption, id: generateID() }];
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
		},
		copyCard: (state, action) => {
			const { id } = action.payload;
			const nextState = state.map((card) => ({ ...card, isFocused: false }));
			const cardIndex = state.findIndex((card) => card.id === id);
			const newCard: CardType = {
				...state[cardIndex],
				id: generateID()
			};
			nextState.splice(cardIndex, 0, newCard);

			return nextState;
		},
		deleteCard: (state, action) => {
			const { id } = action.payload;
			const cardIndex = state.findIndex((card) => card.id === id);
			const nextState = state.map((card, index) => ({
				...card,
				isFocused: index === cardIndex - 1 ? true : false
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

			targetCard.options.push({
				...baseOption,
				content: `옵션${targetCard.options.length + 1}`,
				id: generateID()
			});
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
		}
	}
});

const createAuthoritySlice = createSlice({
	name: 'createAuthority',
	initialState: getCreateAuthority(),
	reducers: {}
});

const store = configureStore({
	reducer: {
		cards: cardSlice.reducer,
		createAuthority: createAuthoritySlice.reducer
	}
});

export type RootStateType = ReturnType<typeof store.getState>;
export const {
	focus,
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
	dragOption
} = cardSlice.actions;

export default store;

import { FormEvent } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootStateType } from '~/store';
import * as S from './index.style';
import ResponseCard from '~/components/ResponseCard';

const Response = () => {
	const cards = useSelector((state: RootStateType) => state.cards);
	const methods = useForm({ mode: 'onBlur' });

	const handleSubmitForm = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<S.Container>
			<form>
				<S.Header>
					<S.SubmitTooltip label='보내기'>
						<S.SubmitButton onSubmit={handleSubmitForm}>보내기</S.SubmitButton>
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

import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import * as S from './index.style';

interface InputCheckbox {
	id: string;
}

const InputCheckbox = ({ id }: InputCheckbox) => {
	const EtcRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch();
	const { control } = useFormContext();
	const { options, required } = useSelector((state: RootStateType) => {
		const targetCard = state.cards.find((card) => card.id === id) as CardType;

		return { options: targetCard.options, required: targetCard.required };
	}, shallowEqual);

	const handleChangeEtc = (optionId: string, value: string) => {
		dispatch(changeInputValue({ cardId: id, optionId, value }));
	};

	return (
		<Controller
			control={control}
			name={id}
			rules={{
				validate: (value) => {
					if (
						required === true &&
						(value === undefined || value.length === 0)
					) {
						return '필수 입력 값입니다.';
					}
					if (
						EtcRef &&
						EtcRef.current &&
						value.includes(EtcRef.current.id) &&
						EtcRef.current.value.length === 0
					) {
						return '필수 입력 값입니다.';
					}

					return true;
				}
			}}
			render={({ field: { onChange, onBlur } }) => (
				<CheckboxGroup onChange={onChange}>
					<Stack
						gap={3}
						direction={'column'}>
						{options.map((option) =>
							option.type === 'normal' ? (
								<Checkbox
									onChange={onBlur}
									colorScheme='purple'
									key={option.id}
									value={option.id}>
									{option.content}
								</Checkbox>
							) : (
								<S.EtcContainer>
									<Checkbox
										colorScheme='purple'
										value={option.id}
									/>
									<S.EtcText>기타: </S.EtcText>
									<S.EtcInput
										id={option.id}
										ref={EtcRef}
										variant={'flushed'}
										onChange={() => {
											handleChangeEtc(
												option.id,
												EtcRef?.current?.value as string
											);
											onChange(option.id);
											onBlur();
										}}
									/>
								</S.EtcContainer>
							)
						)}
					</Stack>
				</CheckboxGroup>
			)}
		/>
	);
};

export default InputCheckbox;

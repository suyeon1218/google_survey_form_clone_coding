import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CardType, RootStateType, changeInputValue } from '~/store';
import * as S from './index.style';

interface InputRadioProps {
	id: string;
}

const InputRadio = ({ id }: InputRadioProps) => {
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
			name={id}
			rules={{
				required: {
					value: required,
					message: '필수 입력 값입니다.'
				},
				validate: (value) => {
					if (required === true && value === undefined) {
						return '필수 입력 값입니다.';
					}
					if (
						EtcRef &&
						EtcRef.current &&
						EtcRef.current.id === value &&
						EtcRef.current.value.length === 0
					) {
						return '필수 입력 값입니다.';
					}

					return true;
				}
			}}
			control={control}
			defaultValue={required ? options[0].id : undefined}
			render={({ field: { onChange, value, onBlur } }) => (
				<RadioGroup
					defaultValue={required ? options[0].id : undefined}
					value={value}
					onChange={onChange}>
					<Stack
						gap={3}
						direction={'column'}>
						{options.map((option) => {
							return option.type === 'normal' ? (
								<Radio
									colorScheme='purple'
									key={option.id}
									onChange={onBlur}
									value={option.id}>
									{option.content}
								</Radio>
							) : (
								<S.EtcContainer key={option.id}>
									<Radio
										colorScheme='purple'
										value={option.id}
									/>
									<S.EtcText>기타:</S.EtcText>
									<S.EtcInput
										id={option.id}
										ref={EtcRef}
										variant={'flushed'}
										onFocus={() => {
											onChange(option.id);
										}}
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
							);
						})}
					</Stack>
				</RadioGroup>
			)}
		/>
	);
};

export default InputRadio;

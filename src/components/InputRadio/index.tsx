import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
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

	const handleChangeEtc = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, dataset } = event.target;
		const { optionId } = dataset;

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
				validate: (value) => value.length > 0 || '필수 입력 값입니다.'
			}}
			control={control}
			defaultValue={required ? options[0].content : undefined}
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
									value={option.content}>
									{option.content}
								</Radio>
							) : (
								<S.EtcContainer key={option.id}>
									<Radio
										colorScheme='purple'
										value={option.content}
									/>
									<S.EtcText>기타:</S.EtcText>
									<S.EtcInput
										ref={EtcRef}
										variant={'flushed'}
										data-option-id={option.id}
										onBlur={onBlur}
										onChange={(event) => {
											handleChangeEtc(event);
											onChange(EtcRef && EtcRef.current?.value);
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

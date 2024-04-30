import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, MenuDivider } from '@chakra-ui/react';
import { useState, MouseEvent } from 'react';
import * as S from './index.style';

interface CardMenuProps {
	menuList: string[] | { [key: string]: string };
	defaultValue?: string;
	onClick?: (item: unknown) => void;
	includeDefaultValue?: boolean;
}

const DropDown = ({
	defaultValue,
	menuList,
	onClick,
	includeDefaultValue = false
}: CardMenuProps) => {
	const [selectedValue, setSelectedValue] = useState(() => {
		if (includeDefaultValue) {
			return undefined;
		}
		if (defaultValue) {
			return defaultValue;
		}
		if (Array.isArray(menuList)) {
			return menuList[0];
		}

		return Object.values(menuList)[0];
	});

	const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
		const target = event.target as HTMLElement;
		const key = target.dataset.key as string;

		if (Array.isArray(menuList)) {
			if (key === 'defaultOption') {
				setSelectedValue(undefined);
				onClick && onClick(undefined);
			} else {
				setSelectedValue(menuList[Number(key)]);
				onClick && onClick(key);
			}
		} else {
			setSelectedValue(menuList[key]);
			onClick && onClick(key);
		}
	};

	return (
		<S.Container>
			<S.Button
				rightIcon={<ChevronDownIcon />}
				as={Button}>
				{selectedValue ? selectedValue : '선택'}
			</S.Button>
			<S.List>
				{includeDefaultValue && (
					<>
						<S.Item
							value={undefined}
							isSelect={selectedValue === undefined}
							onClick={handleClickItem}>
							선택
						</S.Item>
						<MenuDivider />
					</>
				)}
				{Object.entries(menuList).map(([key, value]) => (
					<S.Item
						key={key}
						value={value}
						isSelect={value === selectedValue}
						onClick={handleClickItem}
						data-key={key}>
						{value}
					</S.Item>
				))}
			</S.List>
		</S.Container>
	);
};

export default DropDown;

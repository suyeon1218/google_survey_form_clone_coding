import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useState, MouseEvent } from 'react';
import * as S from './index.style';

interface CardMenuProps {
	menuList: string[] | { [key: string]: string };
	defaultValue?: string;
	onClick?: (item: string) => void;
}

const DropDown = ({ defaultValue, menuList, onClick }: CardMenuProps) => {
	const [selectedValue, setSelectedValue] = useState(
		Array.isArray(menuList) && defaultValue === undefined
			? menuList[0]
			: !Array.isArray(menuList) && defaultValue === undefined
				? menuList[Object.keys(menuList)[0]]
				: defaultValue
	);

	const handleClickItem = (event: MouseEvent<HTMLButtonElement>) => {
		const target = event.target as HTMLElement;
		const key = target.dataset.key as string;

		if (Array.isArray(menuList)) {
			setSelectedValue(menuList[Number(key)]);
			onClick && onClick(key);
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
				{selectedValue}
			</S.Button>
			<S.List>
				{Object.entries(menuList).map(([key, value]) => (
					<S.Item
						key={key}
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

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface ItemProps {
	isSelected: boolean;
}

export const Container = styled(Menu)``;

export const Button = styled(MenuButton)`
	width: 150px;
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid ${({ theme }) => theme.colors.gray[200]};
	text-align: left;
`;

export const List = styled(MenuList)``;

export const Item = styled(MenuItem)<ItemProps>`
	background-color: ${({ theme, isSelected }) =>
		isSelected ? theme.colors.gray[100] : theme.colors.white};

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray[100]};
	}
`;

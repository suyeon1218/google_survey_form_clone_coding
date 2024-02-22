import styled from '@emotion/styled';

interface ContainerProps {
	isTitle: boolean;
}

export const Container = styled.textarea<ContainerProps>`
	box-sizing: border-box;
	resize: none;
	width: 100%;
	overflow-y: hidden;
	outline: 0px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
	transition: 0.2s all;
	font-size: ${({ isTitle, theme }) =>
		isTitle ? theme.fontSizes['3xl'] : theme.fontSizes['md']};

	:focus {
		border-bottom: 3px solid ${({ theme }) => theme.colors.purple[500]};
	}
`;

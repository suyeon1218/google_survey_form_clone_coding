import styled from '@emotion/styled';

interface ContainerProps {
	isTitle: boolean;
}

export const Container = styled.div``;

export const TextArea = styled.textarea<ContainerProps>`
	box-sizing: border-box;
	resize: none;
	width: 100%;
	height: auto;
	padding: 8px 0px;
	overflow-y: hidden;
	outline: 0px;
	transition: 0.2s all;
	border-bottom: ${({ theme, isTitle }) =>
		isTitle ? `1px solid ${theme.colors.gray[100]}` : ''};
	font-size: ${({ isTitle, theme }) =>
		isTitle ? theme.fontSizes['3xl'] : theme.fontSizes['md']};

	:focus {
		border-bottom: 3px solid ${({ theme }) => theme.colors.purple[500]};
	}
	&:read-only {
		outline: none;
		border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
		cursor: default;
	}
`;

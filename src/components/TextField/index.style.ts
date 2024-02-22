import styled from '@emotion/styled';

export const Container = styled.textarea`
	box-sizing: border-box;
	resize: none;
	width: 100%;
	overflow-y: hidden;
	outline: 0px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
	transition: 0.2s all;

	:focus {
		border-bottom: 3px solid ${({ theme }) => theme.colors.purple[500]};
	}
`;

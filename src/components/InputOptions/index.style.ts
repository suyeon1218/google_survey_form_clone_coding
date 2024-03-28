import styled from '@emotion/styled';

export const LastOptionContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const AddOptionButton = styled.button`
	color: ${({ theme }) => theme.colors.gray[600]};
	background-color: ${({ theme }) => theme.colors.white};
	margin: 0px 10px;

	&:hover {
		border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
	}
`;

export const AddEtcButton = styled.button`
	padding: 5px 5px;
	margin: 0px 5px;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.blue[500]};
	border-radius: 5px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray[50]};
	}
`;

import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 20px;
  padding: 10px 15px 10px 15px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.02em;

  &:hover {
    color: ${({ theme }) => theme.colors.orange};
  }

  &:active {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.orange};
    transition: background-color 0.2s ease-in-out;
  }
`;

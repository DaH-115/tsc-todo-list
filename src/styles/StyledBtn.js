import styled from 'styled-components';

const StyledBtn = styled.button`
  width: auto;
  height: 100%;

  color: ${({ theme }) => theme.commonColors.black};
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme.commonColors.gray};
  border-radius: 24px;
  padding: 10px 20px;
  margin: 0 2px;
  font-weight: 600;
  font-size: 18px;

  &:hover {
    color: ${({ theme }) => theme.colors.triangle};
    border-color: ${({ theme }) => theme.colors.triangle};
    transition: color 0.1s ease-in-out;
  }

  &:active {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.triangle};
    transition: background-color 0.2s ease-in-out;
  }

  &:disabled {
    color: ${({ theme }) => theme.commonColors.gray};
    pointer-events: none;
  }
`;

export default StyledBtn;

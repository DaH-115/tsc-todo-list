import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import StyledFigures from 'components/StyledFigures';

interface SelectMenuProps {
  istoggle: boolean;
  getToggle: () => void;
  getFigure: (figureName: any) => void;
}

const SelectMenu = ({ istoggle, getToggle, getFigure }: SelectMenuProps) => {
  const getFigureHandler = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      const figureItem = event.target as HTMLElement;
      const figureName = figureItem.getAttribute('data-figure');

      if (figureName) {
        getFigure(figureName);
        getToggle();
      }
    },
    [getFigure, getToggle]
  );

  return (
    <SelectMenuWrapper $istoggle={istoggle}>
      <SelectMenuList onClick={getFigureHandler}>
        <SelectMenuItem>
          <StyledFigures size='small' figurecolor='triangle' />
          <FigureDesc data-figure='triangle'>{'중요해요'}</FigureDesc>
        </SelectMenuItem>
        <SelectMenuItem>
          <StyledFigures size='small' figurecolor='square' />
          <FigureDesc data-figure='square'>{'기억해 두세요'}</FigureDesc>
        </SelectMenuItem>
        <SelectMenuItem>
          <StyledFigures size='small' figurecolor='circle' />
          <FigureDesc data-figure='circle'>{'언제든지 하세요'}</FigureDesc>
        </SelectMenuItem>
      </SelectMenuList>
    </SelectMenuWrapper>
  );
};

export default React.memo(SelectMenu);

// Animation Setting
const fadeSlideIn = keyframes`
  from {
    transform: translateY(10%);
    opacity: 0;
    pointer-events: none;
  }
  to {
    transform: translateY(0);
    opacity: 1;
    pointer-events: none;
  }
`;

const fadeSlideOut = keyframes`
  from {
      transform: translateY(0);
      opacity: 1;
  }
  to {
      transform: translateY(10%);
      opacity: 0;
  }
`;

const SelectMenuWrapper = styled.div<{ $istoggle: boolean }>`
  position: absolute;
  bottom: 4rem;
  left: 0;

  visibility: ${({ $istoggle }) => ($istoggle ? 'visible' : 'hidden')};
  animation: ${({ $istoggle }) => ($istoggle ? fadeSlideIn : fadeSlideOut)} 0.4s
    ease-in-out;
  transition: visibility 0.4s ease-in-out;
`;

const SelectMenuList = styled.ul`
  width: 10rem;
  border: 0.1rem solid ${({ theme }) => theme.commonColors.light_gray};
  border-radius: 1rem;

  background-color: #fff;
  box-shadow: 0px 5px 40px rgba(177, 177, 177, 0.25);
`;

const SelectMenuItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;

  font-size: 1rem;
  padding: 0.8rem;
  padding-right: 0;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.commonColors.light_gray};
  }
`;

const FigureDesc = styled.p`
  margin-left: 0.3rem;

  padding: 1rem;
  padding-left: 0;
`;
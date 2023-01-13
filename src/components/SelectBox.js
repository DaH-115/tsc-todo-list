import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import LogoFigures from './LogoFigures';
import StyledBtn from '../styles/StyledBtn';
import StyledFigure from './StyledFigure';

const SelectBox = ({ getFigure, isOpen, figure }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setToggle(false);
    }
  }, [isOpen]);

  const onToggleHandler = useCallback(() => {
    setToggle((preve) => !preve);
  }, []);

  const getFigureHandler = useCallback(
    (event) => {
      getFigure(event.target.className);
      setToggle(false);
    },
    [getFigure]
  );

  return (
    <>
      <ButtonWrapper>
        <SelectToggleWrapper onClick={onToggleHandler}>
          <LogoFigures figure={figure} />
          <div>{toggle ? <FaAngleDown /> : <FaAngleUp />}</div>
        </SelectToggleWrapper>
        <SubmitBtn>등록</SubmitBtn>
      </ButtonWrapper>
      <SelectBoxWrapper toggle={toggle}>
        <SelectBoxUl onClick={getFigureHandler}>
          <SelectBoxLi className='triangle'>
            <FigureStyleBox>
              <StyledFigure size='small' figure='triangle' />
            </FigureStyleBox>
            중요해요
          </SelectBoxLi>
          <SelectBoxLi className='square'>
            <FigureStyleBox>
              <StyledFigure size='small' figure='square' />
            </FigureStyleBox>
            기억해 두세요
          </SelectBoxLi>
          <SelectBoxLi className='circle'>
            <FigureStyleBox>
              <StyledFigure size='small' figure='circle' />
            </FigureStyleBox>
            언제든지 하세요
          </SelectBoxLi>
        </SelectBoxUl>
      </SelectBoxWrapper>
    </>
  );
};

export default React.memo(SelectBox);

// *animation setting
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
// animation setting*

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 2px solid ${({ theme }) => theme.commonColors.light_gray};
`;

const SelectToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
`;

const SelectBoxWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;

  visibility: ${({ toggle }) => (toggle ? 'visible' : 'hidden')};
  animation: ${({ toggle }) => (toggle ? fadeSlideIn : fadeSlideOut)} 0.4s
    ease-in-out;
  transition: visibility 0.4s ease-in-out;
`;

const SelectBoxUl = styled.ul`
  width: 200px;
  background-color: #fff;
  box-shadow: 0px 5px 40px rgba(177, 177, 177, 0.25);
`;

const SelectBoxLi = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.commonColors.light_gray};
  }
`;

const FigureStyleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 6px;
`;

const SubmitBtn = styled(StyledBtn)`
  width: 80px;
`;

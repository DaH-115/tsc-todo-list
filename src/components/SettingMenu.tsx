import React from 'react';
import styled, { keyframes } from 'styled-components';
import { themePalettes } from 'styles/theme-colors';
import { fadeIn, fadeOut } from 'styles/animation-setting';
import { useAppSelector } from 'store/hooks';

import ColorPalette from 'components/ColorPalette';
import { Title } from 'styles/Title';
import { Btn } from 'styles/Button/Btn';

interface SlideMenuProps {
  isOpen: boolean;
  slideMenuHandler?: () => void;
}

const SettingMenu = ({ isOpen, slideMenuHandler }: SlideMenuProps) => {
  const paletteName = useAppSelector((state) => state.themeChange.paletteName);

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={slideMenuHandler} />
      <SlideMenuContainer $isOpen={isOpen}>
        <Title title='Setting' desc='색상 설정' />

        {themePalettes.map((item, index) => (
          <ColorPalette
            key={index}
            name={item.name}
            isSelected={paletteName === item.name ? true : false}
          />
        ))}

        <BtnWrapper onClick={slideMenuHandler}>
          <Btn type='button' text='적용' isEmpty />
        </BtnWrapper>
      </SlideMenuContainer>
    </>
  );
};

export default React.memo(SettingMenu);

// For Slide Menu Animation Setting
const fadeSlideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
    pointer-events: none;
  }
  to {
    transform: translateX(0);
    opacity: 1;
    pointer-events: none;
  }
`;
const fadeSlideOut = keyframes`
  from {
      transform: translateX(0);
      opacity: 1;
  }
  to {
      transform: translateX(100%);
      opacity: 0;
  }
`;

const SlideMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;

  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  animation: ${({ $isOpen }) => ($isOpen ? fadeSlideIn : fadeSlideOut)} 0.4s
    ease-in-out;
  transition: visibility 0.4s ease-in-out;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.commonColors.light_gray};
  box-shadow: 0 0.2rem 2rem rgba(177, 177, 177, 0.25);
  padding: 1rem 2rem;

  ${({ theme }) => theme.device.tablet} {
    width: 40%;
    padding: 1rem 2rem;
  }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  width: 100%;
  height: 100%;
  background-color: rgba(177, 177, 177, 0.5);

  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.4s ease-in-out;
  transition: visibility 0.4s ease-in-out;
`;

const BtnWrapper = styled.div`
  width: 100%;
`;

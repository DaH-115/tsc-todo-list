import { useCallback } from 'react';
import { styled } from 'styled-components';
import StyledBtn from 'styles/StyledBtn';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { modalIsClose } from 'store/modalSlice';
import PortalComponents from 'components/modals/PortalComponents';
import Backdrop from 'components/modals/Backdrop';

const Alert = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.confirmState.isOpen);

  const AlertIsCloseHandler = useCallback(() => {
    dispatch(modalIsClose());
  }, [dispatch]);

  return (
    <PortalComponents>
      <Backdrop isopen={isOpen} />
      <AlertWrapper>
        <MessageWrapper>
          <AlertTitel>{'알림'}</AlertTitel>
          <AlertDesc>{'문제가 발생했습니다.'}</AlertDesc>
          <BtnWrapper>
            <StyledBtn onClick={AlertIsCloseHandler}>{'확인'}</StyledBtn>
          </BtnWrapper>
        </MessageWrapper>
      </AlertWrapper>
    </PortalComponents>
  );
};

export default Alert;

const AlertWrapper = styled.div`
  width: 100%;
  min-width: ${({ theme }) => theme.size.mobile};
  padding: 1rem;
  z-index: 999;
`;

const MessageWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90%;
  font-size: 1.2rem;

  padding: 1rem 1.2rem;

  background-color: #fff;
  border: 0.1rem solid ${({ theme }) => theme.colors.important};
  border-radius: 1.5rem;
  box-shadow: 0 0.2rem 2rem rgba(177, 177, 177, 0.25);

  ${({ theme }) => theme.device.tablet} {
    width: 30%;
    font-size: 1rem;
  }
`;

const AlertTitel = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const AlertDesc = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { removeTodo, toggleTodo } from 'store/todoListSlice';
import { editModalIsOpen } from 'store/modalSlice';
import { useAppDispatch } from 'store/hooks';
import { TodoProps } from 'pages/TodoListPage';

import StyledBtn from 'styles/StyledBtn';
import Notification from 'layout/Notification';
import StyledFigures from 'components/StyledFigures';
import ModalInput from 'components/ModalInput';
import EditInputModal from 'components/EditInputModal';

const TodoListItem = ({ id, text, figure, done, date }: TodoProps) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (done && isToggle) {
      timeout = setTimeout(() => setIsToggle(false), 1200);
    }

    if (!done && isToggle) {
      setIsToggle(false);
    }

    return () => clearTimeout(timeout);
  }, [isToggle, done]);

  const onToggleTodoHandler = useCallback(
    (id: string) => {
      dispatch(toggleTodo(id));

      if (!done) {
        setIsToggle(true);
      }
    },
    [dispatch, done]
  );

  const onRemoveTodoHandler = useCallback(
    (id: string) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const onModalOpenHandler = useCallback(() => {
    dispatch(editModalIsOpen());
  }, [dispatch]);

  return (
    <>
      <Notification toggle={isToggle} figure={figure} />
      <TodoItemWrapper>
        <TodoItemContent onClick={() => onToggleTodoHandler(id)}>
          <StyledFigures figurecolor={figure} size='small' />
          <ContentText $done={done}>{text}</ContentText>
          <TodoDate>{date}</TodoDate>
        </TodoItemContent>

        <BtnWrapper>
          <EditBtn onClick={onModalOpenHandler}>{'수정하기'}</EditBtn>
          <EditInputModal
            contentId={id}
            contentText={text}
            contentFigure={figure}
          />
          <RemoveBtn onClick={() => onRemoveTodoHandler(id)}>
            {'지우기'}
          </RemoveBtn>
        </BtnWrapper>
        <ModalInput />
      </TodoItemWrapper>
    </>
  );
};

export default React.memo(TodoListItem);

const TodoDate = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.commonColors.gray};

  font-size: 0.8rem;
  padding-top: 0.2rem;
  border-top: 0.1rem solid ${({ theme }) => theme.commonColors.light_gray};
`;

const ContentText = styled.p<{ $done: boolean }>`
  width: 100%;
  font-size: 1.2rem;
  line-height: 2rem;
  word-break: break-all;

  margin-left: 0.2rem;
  padding: 1rem;
  padding-left: 0;

  color: ${({ theme, $done }) =>
    $done ? theme.commonColors.gray : theme.commonColors.black};
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
  white-space: pre-line;

  ${({ theme }) => theme.device.desktop} {
    width: 100%;
    height: 5rem;
    max-height: 5rem;
    font-size: 1rem;
  }

  /* scrollbar */
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const TodoItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1rem;
  margin-bottom: 0.8rem;

  box-shadow: 0 0.2rem 2rem rgba(177, 177, 177, 0.25);

  ${({ theme }) => theme.device.desktop} {
    padding: 0.8rem;
  }
`;

const TodoItemContent = styled.div`
  width: 100%;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-top: 0.5rem;

  ${({ theme }) => theme.device.tablet} {
    margin-top: 0.2rem;
  }
`;

const RemoveBtn = styled(StyledBtn)`
  width: 100%;
  color: ${({ theme }) => theme.commonColors.gray};
  font-size: 0.9rem;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    font-size: 0.8rem;
  }
`;

const EditBtn = styled(StyledBtn)`
  width: 100%;
  margin-left: 0.2rem;
  color: ${({ theme }) => theme.commonColors.gray};
  font-size: 0.9rem;

  ${({ theme }) => theme.device.tablet} {
    width: auto;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
`;
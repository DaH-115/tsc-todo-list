import React, { useState, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { TaskTypes, addTask } from 'store/taskListSlice';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Modal from 'components/modals/Modal';
import SelectedShapes from 'components/figures/SelectedShapes';
import SelectMenu from 'components/SelectMenu';
import { Title } from 'styles/Title';
import { Btn } from 'styles/Button/Btn';

const ModalInput = () => {
  const [text, setText] = useState('');
  const [shape, setShape] = useState('');
  const [toggle, setToggle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const isInputState = useAppSelector((state) => state.modal.inputState);
  const today = useMemo(() => new Date(), []);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      setText(text);
    },
    []
  );

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!text || !shape) {
        alert('텍스트와 도형을 채워주세요');
        textareaRef.current?.focus();
        return;
      }

      const newTask: TaskTypes = {
        id: uuidv4(),
        date: today.toLocaleDateString(),
        text,
        shape,
        done: false,
      };

      dispatch(addTask(newTask));
      setText('');
      setShape('');
    },
    [dispatch, shape, text, today]
  );

  const onToggleHandler = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  const getShapeHandler = useCallback((shapeName: string) => {
    setShape(shapeName);
  }, []);

  return (
    <Modal modalState={isInputState}>
      <ModalInputWrapper>
        <ModalHeader>
          <Title title='Task' desc={today.toLocaleDateString()} />
        </ModalHeader>

        <InputLabel htmlFor='task-input'>{'Task Input'}</InputLabel>
        <InputForm id='task-input' onSubmit={onSubmitHandler}>
          <Textarea
            value={text}
            onChange={onChangeHandler}
            ref={textareaRef}
            placeholder='오늘 해야 할 일은 무엇인가요?'
          />
          <BtnWrapper>
            <SelectShapesWrapper onClick={onToggleHandler}>
              <ShapeWrapper>
                <SelectedShapes shape={shape} />
              </ShapeWrapper>
              <SelectMenu
                isToggle={!isInputState ? false : toggle}
                getShape={getShapeHandler}
              />
            </SelectShapesWrapper>
            <ToggleIcon>
              {toggle ? (
                <FaAngleDown fontSize={'1.3rem'} />
              ) : (
                <FaAngleUp fontSize={'1.3rem'} />
              )}
            </ToggleIcon>
            <SubmitBtnWrapper>
              <Btn type='submit' text='등록' />
            </SubmitBtnWrapper>
          </BtnWrapper>
        </InputForm>
      </ModalInputWrapper>
    </Modal>
  );
};

export default React.memo(ModalInput);

const ModalInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const ModalHeader = styled.div`
  color: ${({ theme }) => theme.commonColors.gray};
`;

const InputLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const InputForm = styled.form`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 40dvh;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;

  ${({ theme }) => theme.device.tablet} {
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 0.1rem solid ${({ theme }) => theme.commonColors.light_gray};
`;

const SelectShapesWrapper = styled.div`
  width: 40%;
`;

const ShapeWrapper = styled.div`
  width: 100%;
`;

const ToggleIcon = styled.div`
  padding: 0.5rem;
  margin-right: 1rem;
`;

const SubmitBtnWrapper = styled.div`
  width: 100%;
`;

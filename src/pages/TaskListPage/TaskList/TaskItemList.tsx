import React, { memo, useCallback } from 'react';
import { TaskTypes, editingTask, toggleTask } from 'store/taskListSlice';
import {
  notificationIsOpen,
  removeConfirmOpen,
  updateConfirmOpen,
} from 'store/modalSlice';
import { useAppDispatch } from 'store/hooks';
import {
  BtnWrapper,
  ContentBottom,
  ContentHeader,
  ContentText,
  DoneButton,
  RemoveIcon,
  ShapeDesc,
  TaskDate,
  TaskItem,
  TaskList,
  UpdateIcon,
} from 'pages/TaskListPage/TaskList/TaskItemList.styles';
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from 'react-icons/io';

import SingleShapes from 'components/shapes/SingleShapes';
import Btn from 'components/Button/Btn';

const TaskItemList = ({ processTask }: { processTask: TaskTypes }) => {
  const { id, text, shape, priorityDesc, date, done } = processTask;
  const dispatch = useAppDispatch();

  const toggleTaskHandler = useCallback(() => {
    dispatch(toggleTask(id));
    dispatch(notificationIsOpen(!done));
  }, [dispatch, id, done]);

  const removeConfirmOpenHandler = useCallback(() => {
    dispatch(removeConfirmOpen());
    dispatch(editingTask(id));
  }, [dispatch, id]);

  const updateConfirmOpenHandler = useCallback(() => {
    dispatch(updateConfirmOpen());
    dispatch(editingTask(id));
  }, [dispatch, id]);

  return (
    <TaskList>
      <TaskItem>
        <ContentHeader
          onClick={toggleTaskHandler}
          role='checkbox'
          aria-checked={done}
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleTaskHandler();
            }
          }}
        >
          {/* 도형 이미지 */}
          <SingleShapes shapeName={shape} />
          <DoneButton $isChecked={done}>
            {done ? (
              <IoIosCheckmarkCircle aria-hidden />
            ) : (
              <IoIosCheckmarkCircleOutline aria-hidden />
            )}
          </DoneButton>
        </ContentHeader>
        <ContentText $isDone={done}>{text}</ContentText>
        <ContentBottom>
          <TaskDate>{date}</TaskDate>
          <ShapeDesc>{priorityDesc}</ShapeDesc>
        </ContentBottom>
        {/* 버튼 영역 */}
        <BtnWrapper>
          <Btn
            type='button'
            text='수정'
            isEmpty
            onClickFn={updateConfirmOpenHandler}
          >
            <UpdateIcon aria-hidden />
          </Btn>
          <Btn
            type='button'
            text='삭제'
            isEmpty
            onClickFn={removeConfirmOpenHandler}
          >
            <RemoveIcon aria-hidden />
          </Btn>
        </BtnWrapper>
      </TaskItem>
    </TaskList>
  );
};

export default memo(TaskItemList);

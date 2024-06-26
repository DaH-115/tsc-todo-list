import { Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import TaskListPage from 'pages/TaskListPage';
import ShapeListPage from 'pages/ShapeListPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/task-list' element={<TaskListPage />} />
      <Route path='/shape-list' element={<ShapeListPage />} />
      <Route path='/*' element={<MainPage />} />
    </Routes>
  );
};

export default RoutesComponent;

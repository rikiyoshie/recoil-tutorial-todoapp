import { RecoilRoot } from 'recoil';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBoardPage from './pages/TaskBoardPage';
import TodoPage from './pages/TodoPage';
import GridPage from './pages/GridPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskBoardPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/grid" element={<GridPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

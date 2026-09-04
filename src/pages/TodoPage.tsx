import { Link } from 'react-router-dom';
import AddTask from '../components/AddTask';
import InputTask from '../components/InputTask';

const TodoPage = () => {
  return (
    <div className="task">
      <Link to="/">トップへ戻る</Link>
      <InputTask />
      <AddTask />
    </div>
  );
};

export default TodoPage;

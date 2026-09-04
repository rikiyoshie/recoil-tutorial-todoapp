import { Link } from 'react-router-dom';
import { AgGridReactTable } from '../components/AgGridReactTable';

const GridPage = () => {
  return (
    <div>
      <Link to="/">トップへ戻る</Link>
      <AgGridReactTable />
    </div>
  );
};

export default GridPage;

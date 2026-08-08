import {useState} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

export const AgGridReactTable = () => {
  interface Person {
    name: string;
    age: number;
    address: string;
  }
  
  // 固定の列定義
   const columnDefs: ColDef<Person>[] = [
    { field: 'name', headerName: '名前', editable: true },
    { field: 'age', headerName: '年齢', sortable: true },
    { field: 'address', headerName: '住所', filter: true },
  ];
    
      const [rowData] = useState([
        { name: '田中 一郎', age: 28, address: '北海道' },
        { name: '鈴木 次郎', age: 35, address: '愛知県' },
      ]);
  return (
    <div>
        <AgGridReact<Person>
        rowData={rowData}
        columnDefs={columnDefs}
      />
      
    </div>
  )
}


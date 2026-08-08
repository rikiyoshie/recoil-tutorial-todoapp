import { RecoilRoot } from "recoil";
import "./App.css";
import AddTask from "./components/AddTask";
import InputTask from "./components/InputTask";
import {AgGridReactTable} from './components/AgGridReactTable';
// import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <RecoilRoot>
      <div className="task">
        <InputTask />
        <AddTask />
        <AgGridReactTable/>
      </div>
      {/* <Routes>
        <Route path="/" element={<PageA />} />
      </Routes> */}
    </RecoilRoot>
  );
}

export default App;
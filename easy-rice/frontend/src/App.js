
import React from 'react';
import NavBar from './components/navbar';
import CreateInspectionButton from './components/createButton';
import ControlBar from './components/controlBar';
import TableData from './components/tableData';

function App() {
  return (
    <div className=" bg-[#FAFAFA]">
      <div className='flex flex-col w-full h-full'>
        <div className='flex'>
          <NavBar/>
        </div>
        <div className='flex flex-col mt-10'>
          <div className='flex items-center justify-end'>
              <CreateInspectionButton/>
          </div>
        </div>
        <div className='flex flex-col mt-10 items-center justify-center mx-36'>
          <ControlBar/>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center mx-36 mt-10'>
          <TableData/>
      </div>
    </div>
  );
}

export default App;

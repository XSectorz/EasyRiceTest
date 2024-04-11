
import React from 'react';
import MainPage from './pages/mainPages';
import CreatePage from './pages/createPages';
import ViewResults from './pages/ViewResults';
import EditPages from './pages/EditPages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/create" element={<CreatePage/>}/>
          <Route exact path="/view/:inspectionID" element={<ViewResults/>}/>
          <Route exact path="/edit/:inspectionID" element={<EditPages/>}/>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;

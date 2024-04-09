
import React from 'react';
import MainPage from './pages/mainPages';
import CreatePage from './pages/createPages';
import ViewResults from './pages/ViewResults';
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
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;

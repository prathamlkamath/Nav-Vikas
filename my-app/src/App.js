
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import { Registration } from './components/Registration';
import  Navbar from './components/Navbar';
import QrCode from './pages/QrCode';

export function App() {
  return (
   <div className='body'>
     <Navbar />
     <Routes>
      <Route path='/' element={<Registration />}> Registration Form</Route>
      
     </Routes>
    
      
    </div>
      
    
  );
}


import { Route, Routes } from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import ReservationDetail from './components/Reservation/ReservationDetail';
import ReservationForm from './components/Reservation/ReservationForm';
import ReservationList from './components/Reservation/ReservationList';
import TablesForm from './components/Tables/TablesForm';


import TablesListarMesas from './components/Tables/TablesListarMesas';
import Equipo from './components/Equipo/Equipo';

import TablesMesas from './components/Tables/TablesMesas';
import TablesMesasId from './components/Tables/TablesMesasId';
import { COntextProvider } from './context/GlobalContext';


function App() {
  return (
    <div className="h-full  overflow-hidden">
       <COntextProvider>
      <Navbar />
      <div  >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tablesform" element={<TablesForm />} />
          <Route path="/tablesform/:id" element={<TablesForm />} />
          <Route path="/reservationform" element={<ReservationForm />} />
          <Route path="/reservationform/:id" element={<ReservationForm />} />
          <Route path="/reservationlist" element={<ReservationList />} />
          <Route path="/reservationdetail/:id" element={<ReservationDetail />} />

          <Route path="/tableId/:id" element={< TablesMesasId />} />
          <Route path="/tablesList" element={< TablesListarMesas />} />
          <Route path="/equipo" element={<Equipo/>}/>
         
         

          <Route path="/tablesmesas" element={<TablesMesas />} />

        </Routes>
      </div>
      </COntextProvider>
    </div>
  );
}
export default App;
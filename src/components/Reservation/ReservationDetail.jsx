import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import reservation from "./modalReservationList";
const ReservationDetail = () => {
  const params=useParams()
  const navigate = useNavigate()
  
  const [reservationID, setreservationID] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getReserveInfo = async () => {
      if (params.id) {
       
        const selectedReserve = await axios.get(`https://reservasrestfullapp.onrender.com/api/reserva/mostrar/${params.id}`);
        setreservationID(selectedReserve.data)
       
    setLoading(false)

      }
    };
    getReserveInfo();

  }, [params.id]);
  if (loading){
    return <h1>LOADING</h1>
  }
  return (
    <>
      <div className=" flex flex-col justify-center ">
      <h2 className=' my-9 bg-zinc-950 text-slate-300 p-3 rounded-md mx-auto'>LISTA DE RESERVACIONES</h2>

        <div className=" bg-gradient-to-r from-gray-800 to-gray-5 rounded-lg shadow-md p-4 w-[80%] md:w-[60%] text-slate-100 mx-auto ">
          <ul className="list-none">
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Nombre:</span>
              <span className="w-2/3">{reservationID.cliente.nombre_completo}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Mesa:</span>
              <span className="w-2/3">{reservationID.mesa.nombre_completo}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Fecha:</span>
              <span className="w-2/3">{reservationID.fecha}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Hora:</span>
              <span className="w-2/3">{reservationID.hora}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Número de invitados:</span>
              <span className="w-2/3">{reservationID.cantidadDePersonas}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Teléfono:</span>
              <span className="w-2/3">{reservationID.cliente.telefono}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="w-1/3 text-gray-200">Notas:</span>
              <span className="w-2/3">{reservationID.comentario}</span>
            </li>
          </ul>
        
        </div>
        <button onClick={()=> navigate('/reservationlist')}  className="px-4 py-2 bg-sky-400 w-[30%] mx-auto rounded-lg mt-4 text-lg font-bold text-gray-800">ATRAS</button>
      </div>
    </>
  );
};

export default ReservationDetail;

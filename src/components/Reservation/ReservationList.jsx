import React, { useState, useEffect } from 'react'
import '../../assets/css/reservation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ReservationList (){
  
  
  
  const navigate = useNavigate()
  const [reservation, setReservation] = useState([])
  const [reservationsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
 
  const [selectedPage, setSelectedPage] = useState(1);
  



   

  useEffect(() => {
    axios.get('https://reservasrestfullapp.onrender.com/api/reserva/listar')
      .then(response => {
        setReservation(response.data)
        const totalPages = Math.ceil(response.data.length / reservationsPerPage) // calcular el número total de páginas
        setCurrentPage(totalPages) // establecer la página actual en la última página
        setSelectedPage(totalPages) // establecer la página seleccionada en la última página
      })
      .catch(error => console.log(error))
  }, []);
    


  async function removeRes(id) {
    try {
      const response = await axios.delete(`https://reservasrestfullapp.onrender.com/api/reserva/eliminar/${id}`);
      setTimeout(() => {
        
        alert("Reserva eliminada !!")
      }, 2000);
      navigate('/'); 
     
     
    } catch (error) {
      alert(error);
    }
  }



  const headerTable = [
    { name: 'Cliente', },
    { name: 'Fecha', },
    { name: 'Hora', },
    { name: 'Personas', },
    { name: 'Mesa', },
    { name: 'Acciones', },
  ]


  // Get current reservations
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservation?.slice(indexOfFirstReservation, indexOfLastReservation);

  // Change page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reservation.length / reservationsPerPage); i++) {
    pageNumbers.push(i);
  }
  function handlePagination(num) {
    setCurrentPage(num)
    setSelectedPage(num)
  }

  return (
    <div className='px-8 flex-col justify-center md:w-full reservationBody'>

      <div className='flex justify-center'>
        <h2 className=' my-9 bg-zinc-950 text-slate-300 p-3 rounded-md mx-4'>LISTA DE RESERVACIONES</h2>
      </div>

      <div className=' mx-auto table-responsive block drop-shadow-md w-[90%]'>
        {currentReservations.length === 0 ? (
          <div className="flex justify-center items-center h-full text-2xl">
         ...Loading
          </div>
        ) : (

          <table className='w-full md:w-auto sm:w-auto lg:w-4/5 leading-normal mx-auto '>
            <thead >
              <tr>
                {
                  headerTable.map((item) => (
                    <th className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider'>{item.name}</th>
                  ))
                }

              </tr>
            </thead>
            <tbody >
              {
               currentReservations?.map((reservation) => (
                  <tr key={reservation.id} className=' border-gray-200 bg-gray-100 mx-auto py-4'>

                    <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation?.cliente?.nombre_completo}</td>
                    <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm '>{reservation.fecha}</td>
                    <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation.hora}</td>
                    <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation.cantidadDePersonas}</td>

                    <td className='w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm'>{reservation?.mesa?.nombre_completo}</td>
                    <td className="flex w-2/5 sm:w-1/3 lg:w-auto  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center">
                      <button onClick={() => navigate(`/reservationdetail/${reservation.id}`)} className='mr-4 bg-sky-700 px-1 py-1 rounded-lg text-white text-sm' >
                      <i className="material-icons">visibility</i>
                      </button>
                      <button onClick={() => navigate(`/reservationform/${reservation.id}`)} className='mr-4 bg-purple-700 px-1 py-1 rounded-lg text-white text-sm' >
                      <i className="material-icons">edit</i>
                      </button>
                      <button onClick={() => removeRes(reservation.id) } className='bg-red-700 px-1 py-1 rounded-lg text-white text-sm' >
                      <i className="material-icons">delete</i>
                      </button>

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

      </div>
      <div class="container mx-auto px-4 py-4">
        <nav class="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">

          {pageNumbers.map((num, index) => (
            <div
              className={`border-4 border-sky-300  hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-lg border border-gray-200 bg-white  hover:border-sky-700  ${num === selectedPage ? 'text-red-500 font-bold' : ''}`}
              onClick={() => handlePagination(num)}>
            {num}
            </div>
          ))
          }
        </nav>
      </div>
    </div>
  )



}




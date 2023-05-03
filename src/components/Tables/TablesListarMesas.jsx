import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import "material-icons";
//-------------------------------------------------------------------- GET MESAS
const url = "https://reservasrestfullapp.onrender.com/api/mesa/listar"
const getMesas = async (funcion)=>{
  try{
    const response = await axios({
      url,
      method: 'GET'
    })
    return funcion(response.data)
  }catch (e){console.log(e)}
}
//--------------------------------------------------------------------

const TablesListarMesas = () => {
  const navigate = useNavigate()
  const [mesas, setMesas] = useState([]);
  const [reservationsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);


 

  useEffect(() => {
    getMesas(setMesas)

  }, []);
//-------------------------------------------------------------------- Delete Mesa
async function removeTable(id) {
  try {
    const response = await axios.delete(`https://reservasrestfullapp.onrender.com/api/mesa/eliminar/${id}`);
    navigate('/tablesList'); // instant
   
    getMesas(setMesas)
  } catch (error) {
    alert("NO SE PUEDE ELIMINAR, HAY RESERVAS CON ESTA MESA");
  }
}
//--------------------------------------------------------------------

  const headerTable = [
    { name: "Mesa" },
    { name: "Capacidad" },
    { name: "Ubicacion" },
    { name: "Comentario" },
    { name: "Acciones" },
  ];

  // Get current reservations
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = mesas?.slice(indexOfFirstReservation, indexOfLastReservation);

  // Change page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(mesas.length / reservationsPerPage); i++) {
    pageNumbers.push(i);
  }
  function handlePagination(num) {
    setCurrentPage(num)
    setSelectedPage(num)
  }



  return (
    <div className="px-8 flex-col justify-center md:w-full reservationBody">
      <div className="flex flex-col justify-center ">
        <h2 className="mx-auto my-9">LISTA DE MESAS</h2>
        <button onClick={()=> navigate('/tablesform')} className=" mb-4 w-[17%] mx-auto flex-shrink-0 h-full my-auto bg-green-600 hover:bg-gray-700 rounded-lg font-bold px-3 py-2  text-slate-300 text-lg">
          Crear Mesa
        </button>
      </div>
      <div className=" mx-auto table-responsive block drop-shadow-md  ">
      {currentReservations.length === 0 ? (
          <div className="flex justify-center items-center h-full text-2xl">
         ...Loading
          </div>
        ) : (
        <table className="w-full md:w-auto sm:w-auto lg:w-2/5 leading-normal mx-auto ">
          <thead>
            <tr>
              {headerTable.map((item, index) => (
                <th key= {index} className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentReservations?.map((mesa, index) => (
              <tr key={index} className=" border-gray-200 bg-gray-100 mx-auto">
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.nombre_completo}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.capacidad}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.ubicacion}
                </td>
                <td className="w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b border-gray-200 bg-white text-center text-sm">
                  {mesa.comentario}
                </td>
                <td className="flex w-2/5 sm:w-1/3 lg:w-1/4  px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-center mx-1">
                <button onClick={() => navigate(`/tableID/${mesa.id}`)} className='mr-4 bg-sky-700  px-1 py-1 rounded-lg text-white text-sm' >
                <i className="material-icons">visibility</i>
                      </button>
                <button onClick={() => navigate(`/tablesform/${mesa.id}`)} className='mr-4 bg-purple-700 px-1 py-1 rounded-lg text-white text-sm' >
                <i className="material-icons">edit</i>
                      </button>
                <button onClick={() => removeTable(mesa.id)} className=' bg-red-700 px-1 py-1 rounded-lg text-white text-xs' >
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
              className={`border-4 border-sky-300 hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-lg border border-gray-200 bg-white  hover:border-sky-700 ${num === selectedPage ? 'text-red-500 font-bold' : ''}`}
              onClick={() => handlePagination(num)}>
              {num}
            </div>
          ))
          }
        </nav>
      </div>
    </div>
  );
};

export default TablesListarMesas;

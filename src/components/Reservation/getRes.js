import axios from "axios"


/* export default async function BringUsers() {
    try {
      const res = await fetch('https://team6.onrender.com/api/Usuarios/');
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      // handle the error here
    }
  } */

  const url = "https://reservasrestfullapp.onrender.com/api/reserva/listar"
  export default async function getReserv (){
    try{
      const response = await axios({
        url,
        method: 'GET'
      })
    
      return  response.data
    }catch (e){console.log(e)}
 
  }
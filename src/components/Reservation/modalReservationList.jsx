import React from 'react'

function reservation({ visible, onClose, list,  setFechaSelected }) {
    const handleOnClose = () => {
        onClose()
    }
    if (!visible) return null
    const headerCliente = [
       
        { name: 'Hora', },
        { name: 'Acciones', },
        
 
    ]
    const handleClick=(item)=>{
        setFechaSelected(item)
        onClose()
    }
    return (
        <div className='fixed h-screen inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-1 rounded-lg h-35'>
                <div class="w-full h-auto bg-gray-100 rounded-xl ">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                        <div class="flex flex-col ">
                            <div class="mb-4 flex flex-wrap flex-grow justify-between ">
                                <h1 class="text-3xl font-bolder leading-tight text-gray-900">Reservas del dia</h1>
                                <button onClick={handleOnClose} className='text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-md px-4 py-2'>x</button>
                            </div>
                            <div class="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                                
                            </div>
                            <div class="-my-2 py-1 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div class="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                                    <table class="min-w-full">
                                        <thead>
                                            <tr class="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                                {headerCliente.map((item) => (
                                                    <th class="px-6 py-1 text-left font-medium">
                                                        {item?.name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            {list?.map((item) => (
                                                <tr>
                                                    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200">
                                                        <div class="text-sm leading-5 text-gray-900">
                                                            {item+':00'}
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-1 whitespace-no-wrap border-b border-gray-200">
                                                    <button onClick={()=>handleClick(item)} className='text-white bg-indigo-600 hover:bg-indigo-500 font-medium rounded-md px-4 py-2'>+</button>

                                                    </td>
                                                </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reservation
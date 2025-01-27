import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { deleteItem } from '../libs/ItemSlice'

const ItemDelete:React.FC<{id: number}> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>()
  
  const handleDelete = () => {
    dispatch(deleteItem(id))
  }


  return (
    <div className='mx-auto py-4'>
      <h1 className="text-center text-2xl
       md:text-4xl font-bold text-gray-800">Delete Item</h1>
      <button onClick={handleDelete} className="bg-red-700
       text-white hover:bg-red-800 mx-auto">
          Delete Item
      </button>
    </div>
  )
}

export default ItemDelete

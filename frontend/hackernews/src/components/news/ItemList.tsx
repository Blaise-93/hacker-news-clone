import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchItems } from '../libs/ItemSlice'

const ItemList:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state:RootState) => state.items.items)
  const status = useSelector((state: RootState) => state.items.status)
  const error = useSelector((state: RootState) => state.items.error)


  useEffect(() => {
    dispatch(fetchItems(1))
  }, [dispatch])
    
  if(status == 'loading'){
    return <div className="">Loading...</div>
  }
  if(status== 'failed'){
    return <div className="">{error}</div>
  }

  return (
    <div>
      <h2 className="text-center font-bold text-gray-800">
        Hacker News Items

        <ul className="px-3 py">
          {items.map((item) => (
             <li key={item.id}>
             <h2>{item.title}</h2>
             <p>{item.text}</p>
           </li>
          ))}
        </ul>
      </h2>
    </div>
  )
}

export default ItemList

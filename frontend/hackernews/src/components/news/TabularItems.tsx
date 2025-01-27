import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { Link } from 'react-router-dom'
import { fetchItems } from '../libs/ItemSlice'
import ItemUpdate from './ItemUpdate'
import ItemDelete from './ItemDelete'

const TabularItems:React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const items = useSelector((state:RootState) =>state.items.items)
    const status = useSelector((state:RootState) => state.items.status)
    const error = useSelector((state:RootState) => state.items.error)

    // fetch the item data
    useEffect(() => {
        dispatch(fetchItems(1))

    }, [dispatch])

    if (status === 'loading') {
        return <div className="">Loading...</div>
    }

    if (status === 'failed') {
        return <div className="">Error occured: {error}</div>
    }

  return (
    <div>
        <div className="flex flex-col item-center md:flex-row justify-between">
        <h1 className="text-center md:4xl text-gray-800 text-2xl">Hacker News</h1>
        <Link to={'/item-create'} className="text-center md:3xl text-gray-800 text-xl">
        Create a new Item</Link>
        </div>
        
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr className="hover:text-gray-600">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <span>S/N</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Title
                </th>
            
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Text</th>
                <th scope="col" className="px-6 py-3">Score</th>
                <th scope="col" className="px-6 py-3">Descendant</th>

                <th scope="col" className="px-6 py-3">Time</th>
                <th scope="col" className="px-6 py-3">Kids</th>
                <th scope="col" className="px-6 py-3">Text</th>
                <th scope="col" className="px-6 py-3">URL</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
           
           {

            items.map((item) => (
                <tbody>

                <tr
                  className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                  hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}
                >
  
                   <td className="w-4 p-4">
                      <div className="flex items-center">
                        <span>{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.type}</td>  
                    <td className="px-6 py-4">{item.text}</td>
                    <td className="px-6 py-4">{item.score}</td>  
                    <td className="px-6 py-4">{item.descendant}</td>
                    <td className="px-6 py-4">{item.time}</td>
                    <td className="px-6 py-4">{item.kids.map((kid) => kid)}</td>  
                    <td className="px-6 py-4">{item.url}</td>
              
                    <td className="flex items-center px-6 py-4">
                  <Link
                 
                 
                     to={'/update-item'} className="pr-2 font-medium text-blue-600
                      dark:text-blue-500 hover:underline"
                        ><ItemUpdate id={item.id}/></Link> 
                    
                 </td>
                 <td className="px-6 py-4"><ItemDelete id={item.id}/>Delete item</td>
              </tr>
            
              </tbody>
            ))
         

           }
           </table>
        
     </div>
 


    </div>
  )
}

export default TabularItems

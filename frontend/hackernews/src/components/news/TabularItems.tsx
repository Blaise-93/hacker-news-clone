import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchItems } from "../libs/ItemSlice";
import ItemPagination from "./ItemPagination";

const TabularItems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items) || [];
  const status = useSelector((state: RootState) => state.items.status);
  const error = useSelector((state: RootState) => state.items.error);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  useEffect(() => {
    dispatch(fetchItems(page));
  }, [dispatch, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/items?search=${search}`);
  };

  if (status === "loading") {
    return <div className="">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="">{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col item-center md:flex-row justify-between">
        <h1 className="pb-4 text-center md:4xl text-gray-800 text-2xl">
          Hacker News
        </h1>
        <Link
          to={"/item-create"}
          className="hover:text-blue-700 hover:underline text-center md:3xl text-gray-800 text-xl"
        >
          Create a new Item
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mx-auto py-4 flex space-x-6 items-center">
        <input className="rounded-md py-2"
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-700 rounded-md text-white py-2 px-2" type="submit">Search</button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="hover:text-gray-600">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <span>S/N</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Text
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
              <th scope="col" className="px-6 py-3">
                Descendant
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {items.map((item) => (
            <tbody key={item.id}>
              <tr
                className="text-base bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                <td className="px-6 py-4">{item.url}</td>
                <td className="flex items-center px-6 py-4">
                  <Link
                    to={`/update-item/${item.id}`}
                    className="pr-2 font-medium text-blue-600 
                    dark:text-blue-500 hover:underline hover:text-green-500"
                  >
                    Update
                  </Link>
                  
                  <Link
                    to={`/delete-item/${item.id}`}
                    className="pr-2 font-medium text-blue-600
                     dark:text-blue-500 hover:underline hover:text-red-500"
                  >
                    Delete
                  </Link>
             
                </td>
               
              </tr>
            </tbody>
          ))}
        </table>

      
      </div>
      <ItemPagination
          currentPage={page}
          totalPages={Math.ceil(items.length / 20)}
        />
    </div>
  );
};

export default TabularItems;

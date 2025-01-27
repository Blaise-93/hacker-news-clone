import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateItem } from "../libs/ItemSlice";

const ItemUpdate: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  // retrieve the item from store
  const item = useSelector((state: RootState) =>
    state.items.items.find((item) => item.id === id)
  );
  //the user only has access to update these fields
  const [title, setTitle] = useState(item?.title || '')
  const [text, setText] = useState(item?.text || '')


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // If item is truthy, then update the item
    if (item) {
      // use spread operator to concatenate the
      // already existing item with the one to update
      // by the user.
      const updatedItems = {...item, title, text }
      // dispatch and update the item
      dispatch(updateItem(updatedItems))
    }
  }


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="container mx-auto mx-w-auto"
      >
        <h2 className="text-2xl text-center">Create Item</h2>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Specify the News Title
          </label>
          <input
            type="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Enter the news item title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
             focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Describe the news
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
            placeholder="Describe the news"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
             focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600
               text-white font-semibold rounded-md shadow-sm
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 mb-0"

        >
          Update an Item
        </button>
      </form>
    </div>
  );
};

export default ItemUpdate;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { updateItem } from "../libs/ItemSlice";

const ItemUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const item = useSelector((state: RootState) =>
    state.items.items.find((item) => item.id === parseInt(id || "0"))
  );
  const [title, setTitle] = useState(item?.title || "");
  const [text, setText] = useState(item?.text || "");
  const [type, setType] = useState(item?.type || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setText(item.text);
      setType(item.type);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      const updatedItem = { ...item, title, text, type };
      dispatch(updateItem(updatedItem));
      // clear out the field after the update
      setText("");
      setTitle("");
      setType("");

      navigate("/");
    }
  };

  return (
    <div className="container mx-auto mx-w-auto">
      <form onSubmit={handleSubmit} className="px-12 ">
        <h2 className="text-2xl text-center text-gray-700 my-3">
          Update an Item
        </h2>
        <div className="py-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Specify the News Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Enter the news item title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="py-2">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Specify the News Type
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="type"
            placeholder="Enter the news item type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="text"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
             shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="my-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-0"
        >
          Update an Item
        </button>
      </form>
    </div>
  );
};

export default ItemUpdate;

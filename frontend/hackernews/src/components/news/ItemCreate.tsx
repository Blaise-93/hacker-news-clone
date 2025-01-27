import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Item } from "../libs/ItemTypes";
import { createItem } from "../libs/ItemSlice";

const ItemCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setURL] = useState("");
  const [descendant, setDescendant] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: 0,
      type: "story",
      title: title,
      text: text,
      score: 0,
      time: Math.floor(Date.now() / 1000),
      url: url,
      descendant,
      kids: [],
    };
    dispatch(createItem(newItem));
    // clear out the input field after saving
    setTitle("");
    setText("");
    setURL("");
    setDescendant(0);
  };
  // ensures that the user fill in the form before saving it to the db
  const canSave = Boolean(title) && Boolean(text) && Boolean(url);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="container mx-auto mx-w-auto"
      >
        <h2 className="text-2xl text-center">
          Create Item
        </h2>

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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            
            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
               Enter Descendant Number
              </label>
              <input
                type="number"
                id="descendant"
                value={descendant}
                onChange={(e) => setDescendant(e.target.valueAsNumber)}
                name="descendant"
                placeholder="Enter descendant"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Specify the URL 
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                name="url"
                placeholder="Enter URL of the news item"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600
               text-white font-semibold rounded-md shadow-sm
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 mb-0"
          disabled={!canSave}
        >
          Create an item
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;

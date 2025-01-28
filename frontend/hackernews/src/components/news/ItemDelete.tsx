import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { deleteItem } from "../libs/ItemSlice";

const ItemDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteItem(parseInt(id || '0')));
    navigate('/')
  };

  return (
    <div className="mx-auto py-4">
      <h1 className="text-center text-2xl md:text-4xl py-3 font-bold text-gray-800">
        Are you sure you want to delete this Item?
      </h1>
      <button
        onClick={handleDelete}
        className="bg-red-700 rounded-md py-2 px-3 text-white hover:bg-red-800 mx-auto"
      >
        Delete Item
      </button>
    </div>
  );
};

export default ItemDelete;

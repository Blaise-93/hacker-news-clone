import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "flowbite-react";
import Navigation from "./components/Navigation";
import ItemList from "./components/news/ItemList";
import ItemCreate from "./components/news/ItemCreate";
import TabularItems from "./components/news/TabularItems";
import ItemUpdate from "./components/news/ItemUpdate";
import ItemDelete from "./components/news/ItemDelete";

function App() {
  return (
    <>
      <Navigation />

      <div className="main-container">
        <Routes>
          <Route path="/" element={<TabularItems />} />
          <Route path="items/" element={<ItemList />} />
          <Route path="item-create/" element={<ItemCreate />} />
          <Route path="update-item/:id" element={<ItemUpdate />} />
          <Route path="delete-item/:id" element={<ItemDelete />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

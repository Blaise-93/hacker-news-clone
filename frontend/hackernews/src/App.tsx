import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "flowbite-react";
import Navigation from "./components/Navigation";
import ItemList from "./components/news/ItemList";
import ItemCreate from "./components/news/ItemCreate";
import ItemUpdate from "./components/news/ItemUpdate";
import ItemDelete from "./components/news/ItemDelete";
import TabularItems from "./components/news/TabularItems";

function App() {
  return (
    <>
      <Navigation />

      <div className="main-container">
        <Routes>
          {/* LandingPage page */}
          <Route path='items-crud/' element={<TabularItems/>} />
          <Route path="/" element={<ItemList/>} />
          <Route path="item-create/" element={<ItemCreate />} />
          {/* <Route path="update-item/" element={<ItemUpdate />} />
          <Route path="delete-item/" element={<ItemDelete />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

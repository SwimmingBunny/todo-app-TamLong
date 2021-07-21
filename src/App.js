import React from "react";
// import Home from "./screen/Home";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import "./Todoapp.css";
function App() {
  return (
    <div className="todo-app">
      <div className="contain">
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <Body />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

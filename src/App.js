import { Homepage } from "./pages/Homepage";
import { Detail } from "./pages/Detail";
import logo from "./elephant-logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const App = () => {

  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="header-wrapper">
        <header>
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={logo} className="logo-image" alt="logo"/>
            </Link>
            <div className="logo-name">
              <span className="logo-title">Elephants</span>
              <span className="logo-subtitle">Collection of animals</span>
            </div>
          </div>
          <div className="search">
            <form id="search" onSubmit={handleSubmit}>
              <div className="search-wrapper">
                <input type="text" onChange = {(e) => setName(e.target.value)} value = {name}/>
                <button type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>
          </div>
        </header>
      </div>
      <div id="page">
        <main>
          <Routes>
            <Route path="/" element={<Homepage name={name}/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export {App}

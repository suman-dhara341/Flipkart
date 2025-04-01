import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const responce = await axios.get(
        "http://localhost:4000/api/auth/get-Alldata"
      );
      if (responce.data.success === true) {
        setData(responce.data.userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const search_value = Object.keys(Object.assign({}, ...data));
  function search(data) {
    return data.filter((data) =>
      search_value.some((parameter) =>
        data[parameter]?.toString().toLowerCase().includes(query)
      )
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/"}>
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={""}>
                  Products
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to={""}>
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={""}>
                      Another action
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={""}>
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                name="query"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              {localStorage.getItem("token") ? (
                <NavLink to={"/profile"}>
                  <button className="btn btn-outline-success" type="submit">
                    Profile
                  </button>
                </NavLink>
              ) : (
                <NavLink to={"/login"}>
                  <button className="btn btn-outline-success" type="submit">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
      {search(data).map((dataObj, index) => {
        return (
          <div key={index}>
            <h1>{dataObj.name}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Home;

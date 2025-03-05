import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
       Simmon
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/create">
              Create Post
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/all">
              Read
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/update">
            Update
            </Link>
          </li>
          
          {/* <li className="nav-item">
            <a className="nav-link" href="/link">
              Link
            </a>
          </li> */}
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="javascript:void(0);"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/action">
                Action
              </a>
              <a className="dropdown-item" href="/another-action">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/something-else">
                Something else here
              </a>
            </div>
          </li> */}
          <li className="nav-item">
            {/* <a className="nav-link disabled" href="javascript:void(0);">
              Disabled
            </a> */}
          </li>
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default Navbar;

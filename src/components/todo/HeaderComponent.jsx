import React, { Component } from "react";
import {Link, withRouter } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";


class HeaderComponent extends Component {
    render() {
      const isUseroggedIn = AuthenticationService.isUserLoggedIn();
      console.log(isUseroggedIn);
  
      return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="/welcome/in28minutes" className="navbar-brand">
                in28minutes
              </a>
            </div>
  
            <ul className="navbar-nav">
              {isUseroggedIn && (
                <li className="nav-link">
                  {" "}
                  <Link className="nav-link" to="/welcome/in28minutes">
                    Home
                  </Link>
                </li>
              )}
              {isUseroggedIn && (
              <li className="nav-link">
                {" "}
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUseroggedIn && (
              <li className="nav-link">
                {" "}
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              )}
              {isUseroggedIn && (
              <li className="nav-link">
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  {" "}
                  Logout{" "}
                </Link>
              </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }
  }

  export default withRouter(HeaderComponent);
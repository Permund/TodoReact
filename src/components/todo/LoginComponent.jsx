import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "in28minutes",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    /*         this.handleUserNameChange = this.handleUserNameChange.bind(this)
          this.handlePasswordChange = this.handlePasswordChange.bind(this) */
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /*     handlePasswordChange(event){
          console.log(event.target.value);
          this.setState({password: event.target.value})
      } */

  loginClicked() {
    //in28minutes, dummy
/*     if (this.state.username === "scano" && this.state.password === "dummy") {
      AuthenticationService.registerSuccessfulLogin(
        this.state.username,
        this.state.password
      );
      this.props.history.push(`/welcome/${this.state.username}`);
      //this.setState({ showSuccessMessage: true });
      //this.setState({ hasLoginFailed: false });
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFailed: true });
    } */
/*     AuthenticationService.executrBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(
        ()=>{
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: true });

        }
      );
  } */


  AuthenticationService.executrJwtAuthenticationService(
    this.state.username,
    this.state.password
  )
    .then((response) => {
      AuthenticationService.registerSuccessfulLoginForJwt( this.state.username,response.data.token );
      this.props.history.push(`/welcome/${this.state.username}`);
    })
    .catch(
      ()=>{
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });

      }
    );
}

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
          {/* <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}/> */}
          {this.state.hasLoginFailed && (
            <div className=" alert alert-warning">Invalid Credentials baby</div>
          )}
          {this.state.showSuccessMessage && <div>Login Successfull</div>}
          User Name:{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

/* function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
      return <div>Invalid Credentials baby</div>;
    }
    return null;
  } */

/* function ShowLoginSuccess(props) {
    if (props.showSuccessMessage) {
      return <div>Login Sucessful</div>;
    }
  
    return null;
  } */

export default LoginComponent;

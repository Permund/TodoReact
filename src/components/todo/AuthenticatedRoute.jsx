import Axios from 'axios';
import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

 class AuthenticatedRoute extends Component{

     isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return (user!==null);
    }

    setupAxiousInterceptors(){
        Axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn){
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                }
                return config;
            }
        )
    }

    componentWillMount(){
        this.setupAxiousInterceptors();

    }  



    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return <Route {...this.props}/>
        }
        else{
            return <Redirect to ="/login/"/>
        }
    }
}

export default AuthenticatedRoute
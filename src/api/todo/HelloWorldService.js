import Axios from "axios";

class HelloWorldService {

    executeHelloWorldService() {
        // console.log("executed helloworld")
        return Axios.get("http://localhost:8080/hello-world")

    }

    executeHelloWorldPathVariableService(name) {
/*         let username = "scano"
        let password = 'dummy'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password) */
        return Axios.get(`http://localhost:8080/hello-world-bean/${name}`)
/*         ,
            {
                headers: {
                    authorization: basicAuthHeader

                }
            }); */

         
        }

    

}

export default new HelloWorldService();
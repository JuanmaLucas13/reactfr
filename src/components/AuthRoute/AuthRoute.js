import { Navigate } from "react-router-dom"

const AuthRoute = ({ component }) => {

    if (localStorage.getItem('paisestoken')) 
       return component;

    if (!localStorage.getItem('paisestoken'))
      return <Navigate to="/login" />
}

export default AuthRoute
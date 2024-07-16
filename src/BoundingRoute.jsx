import { useSelector } from "react-redux";
import { isLogged } from "./redux/authSelectors";
import { Navigate } from "react-router-dom";

export const BoundingRoute = ({component: Component, redirect}) => {
    const logged = useSelector(isLogged)
    return logged ?  <Navigate to={redirect}/> : <Component/>
};

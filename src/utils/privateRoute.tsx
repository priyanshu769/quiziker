import { Route, Navigate } from 'react-router-dom'
import { PrivateRouteProps } from "../utils/types"

const PrivateRoute = (props: PrivateRouteProps) => {
  return props?.login ? (
    <Route {...props} path={props?.path} />
  ) : (
    <Navigate state={{ from: props?.path }} replace to="/login" />
  )
}

export default PrivateRoute;
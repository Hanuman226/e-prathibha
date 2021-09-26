import { Redirect, Route } from "react-router";
import auth from "../utils/auth";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

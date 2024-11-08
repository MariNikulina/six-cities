import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;

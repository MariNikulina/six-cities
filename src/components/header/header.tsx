import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import { setUserData } from '../../store/user-process/user-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoriteOffers, logoutAction} from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { redirectToRoute } from '../../store/action';

function Header (): JSX.Element {
  // const {authorizationStatus, user} = useAppSelector((state) => state);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  function handleSignOutClick (): void {
    dispatch(logoutAction());
    dispatch(setUserData(''));
  }

  function handleEmailClick (): void {
    dispatch(fetchFavoriteOffers());
    dispatch(redirectToRoute(AppRoute.Login));
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">

            {AuthorizationStatus.Auth === authorizationStatus && (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={`/${AppRoute.Favorites}`}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span
                      className="header__user-name user__name"
                      onClick={handleEmailClick}
                    >
                      {user}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item" onClick={handleSignOutClick}>
                  <Link to={AppRoute.Main} className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            )}

            {AuthorizationStatus.NoAuth === authorizationStatus && (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../const";

type LogoProps = {
    place?: 'header' | 'footer';
}

function Logo ({place = 'header'}: LogoProps): JSX.Element {
    const location = useLocation();
    const isLocationMain = location.pathname === '/';
    const isFooter = place === 'footer';

    return (
        <Link to={AppRoute.Main} className={`${place}__logo-link ${(isLocationMain || !isFooter) ? `${place}__logo-link--active` : ''}`}>
            <img className={`${place}__logo`} src="img/logo.svg" alt="6 cities logo" width={place === 'header' ? '81' : '64'} height={place === 'header' ? '41' : '33'} />
        </Link>
    )
}

export default Logo;
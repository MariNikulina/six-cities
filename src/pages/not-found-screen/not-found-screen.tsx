import {Link} from 'react-router-dom';

function NotFoundScreen ():JSX.Element {
  return (
    <div style={{height: '100vh'}}>
      <section
        className="game__screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </div>
  );
}

export default NotFoundScreen;

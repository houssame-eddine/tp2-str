import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  const navPosition = props.location.pathname;
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link
            to='/preemptif'
            className={navPosition === '/preemptif' ? 'active' : ''}
          >
            preemptif
          </Link>
        </li>
        <li>
          <Link
            to='/non-preemptif'
            className={navPosition === '/non-preemptif' ? 'active' : ''}
          >
            non-preemtif
          </Link>
        </li>
      </ul>
      <ul>
        {' '}
        <li>
          <Link to='/' className={navPosition === '/' ? 'active' : ''}>
            welcome
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

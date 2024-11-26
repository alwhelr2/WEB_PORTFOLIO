import { useEffect } from 'react';
import logo from '../assets/logo192.png';
import './styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const { pathname, hash } = useLocation();
    const navigate = useNavigate();

    useEffect( () => {

        document.querySelectorAll( '.nav-link, .navbar-brand' ).forEach( ( navlink ) => {

            if ( pathname === '/resume' ) navlink.innerHTML === 'Resume' ? navlink.classList.add( 'active' ) : navlink.classList.remove( 'active' );
            if ( pathname === '/' && hash ) navlink.innerHTML.toLowerCase() === hash.substring( 1 ) ? navlink.classList.add( 'active' ) : navlink.classList.remove( 'active' );

            navlink.addEventListener( 'click', () => {

                document.querySelector( '.nav-link.active' )?.classList.toggle( 'active' );
                if ( navlink.className !== 'navbar-brand' ) navlink.classList.toggle( 'active' );
                if ( navlink.innerHTML !== 'Resume' ) {

                    navigate( '/' );
                    if ( navlink.className === 'navbar-brand' ) document.getElementById( 'homeLink' )?.classList.add( 'active' );

                }

            } );

        } );

    }, [] )

    useEffect( () => {

        if ( pathname.startsWith( '/discord-bot' ) ) {

            document.querySelectorAll( '.nav-link' ).forEach( ( navlink ) => {

                navlink.classList.remove( 'active' );

            } );

        }

    } );

    return (
        <nav className='navbar navbar-expand-sm'>
            <div className='container-fluid'>
                <a className='navbar-brand'>
                    <img src={ logo } height='32' width='32' />
                </a>
                <button className='navbar-toggler px-0' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <div className='navbar-nav mx-auto'>
                        <a className='nav-link active' aria-current='page' href='#' id='homeLink'>Home</a>
                        <a className='nav-link' href='#about'>About</a>
                        <a className='nav-link' href='#experience'>Experience</a>
                        <a className='nav-link' href='#skills'>Skills</a>
                        <a className='nav-link' href='#education'>Education</a>
                        <Link className='nav-link' to='/resume'>Resume</Link>
                    </div>
                </div>
            </div>
        </nav>
    );

}
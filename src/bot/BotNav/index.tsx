import { useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function BotNav() {

    useEffect( () => {
        
        const expandCollapseBtn = document.querySelector( '.btn-expand-collapse' )!;
        const navbarPrimary = document.querySelector( '.navbar-primary' )!;
        const chevronIcon = document.querySelector( '.btn-expand-collapse>.bi' )!;
        expandCollapseBtn.addEventListener( 'click', () => {

            chevronIcon.classList.toggle( 'bi-chevron-right' );
            chevronIcon.classList.toggle( 'bi-chevron-left' );
            navbarPrimary.classList.toggle( 'collapsed' );

        } );

    }, [] );

    return (
        <nav className='navbar-primary'>
            <ul className='navbar-primary-menu'>
                <li>
                    <Link className='navbarlink text-center' to='/discord-bot' role='button'><i className='bi bi-house-fill'/><span className='nav-label ms-2'>Home</span></Link>
                    <Link className='navbarlink text-center' to='/discord-bot/servers' role='button'><i className='bi bi-card-list'/><span className='nav-label ms-2'>Servers</span></Link>
                    <Link className='navbarlink text-center' to='/discord-bot/users' role='button'><i className='bi bi-people-fill'/><span className='nav-label ms-2'>Users</span></Link>
                    <Link className='navbarlink text-center' to='/discord-bot/triggers' role='button'><i className='bi bi-reply'/><span className='nav-label ms-2'>Triggers</span></Link>
                    <Link className='navbarlink text-center' to='/discord-bot/reactionroles' role='button'><i className='bi bi-emoji-smile-upside-down-fill' /><span className='nav-label ms-2'>React Roles</span></Link>
                </li>
            </ul>
            <div className='mt-auto'>
                <a href="#" className='btn-expand-collapse'><i className="bi bi-chevron-left"/></a>
            </div>
        </nav>
    );

}
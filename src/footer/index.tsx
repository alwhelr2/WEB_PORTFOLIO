import { useNavigate } from "react-router-dom";
import './styles.css';

export default function Footer() {

    const navigate = useNavigate();

    return (
        <footer className='Footer mt-auto ms-auto'>
            <a className='contact-link' href='https://github.com/alwhelr2'><i className='bi bi-github' /><span className='link-tooltip'>GitHub</span></a>
            <a className='contact-link' href='https://www.linkedin.com/in/adrian-wheeler121/'><i className='bi bi-linkedin' /><span className='link-tooltip'>LinkedIn</span></a>
            <a className='contact-link' href='mailto:awheeler121@gmail.com'><i className='bi bi-envelope' /><span className='link-tooltip'>Email</span></a>
            <span className='contact-link' onClick={ () => navigate( '/discord-bot' ) }><i className='bi bi-discord' /><span className='link-tooltip'>Discord</span></span>
        </footer>
    );

}
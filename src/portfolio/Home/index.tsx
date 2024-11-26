import './styles.css';
import selfie from '../../assets/selfie.jpg';
import About from '../About';
import Experience from '../Experience';
import Skills from '../Skills';
import Education from '../Education';
import Devicon from '../../pages/Devicon';

export default function Home() {

    return (
        <div className='Home'>
            <p className='text-center name-header barlow-condensed-el-font'>ADRIAN WHEELER</p>
            <p className='text-center section-header'>Software Developer</p>
            <img className='selfie-img mx-auto my-5' src={ selfie } />
            <img className='selfie-img mx-auto reflection' src={ selfie } />
            <About />
            <Experience />
            <Skills />
            <Devicon />
            <Education />
        </div>
    );

}
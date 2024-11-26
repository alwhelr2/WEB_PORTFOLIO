import resume from '../../assets/AdrianWheelerResume2024.jpg';
import './styles.css';

export default function Resume() {

    return (
        <div>
            <img className='mx-auto mt-4 d-block resume-pic' src={ resume } />
        </div>
    );

}
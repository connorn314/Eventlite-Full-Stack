import { useParams } from 'react-router-dom';
import './UserShowPage.css'

const UserShowPage = () => {
    const { userId } = useParams();


    return (
        <div>Hello All from user: {userId}</div>
    )
}

export default UserShowPage;
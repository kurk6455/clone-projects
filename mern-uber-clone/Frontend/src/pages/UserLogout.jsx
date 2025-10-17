import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    try{
        axios.get(`&{import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then( (response) => {
            if(response.data){
                localStorage.removeItem('token');
                navigate('/users/login');
            }
        })
    }catch(e){
        console.log(e);
    }

  return (
    <div>User Logout</div>
  )
}

export default UserLogout;

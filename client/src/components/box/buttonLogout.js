import { useHistory } from 'react-router-dom';
import { PERSISTENCE_STORAGE } from '../../_redux/store';
// logout
function ButtonLogout(props) {    
    let history = useHistory();
    return (
        <>
            <button type="button" onClick={()=>{
                localStorage.removeItem(PERSISTENCE_STORAGE);
                history.replace('/');
            }} className="btn btn-warning">
                Logout
            </button>
        </>
    )
}

export default ButtonLogout;
import { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/css/App.css'
import LoginForm from '../components/forms/login.form'
import RegisterForm from '../components/forms/register.form'
import { PERSISTENCE_STORAGE } from '../_redux/store';
function LoginPage(props) {  
  let history = useHistory();  
  let [isLogin, setLogin] = useState(true);
  useEffect(()=>{
    let login = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));    
    if(login){
      if(!login.userLoginReducer.isLogin){
        setLogin(false);        
      }else{
        history.push("/movies");
      }
    }else{
      setLogin(false);
    }    
  }
  );
  if(!isLogin) return(
    <div className="App">
        <LoginForm /> 
        <RegisterForm/>       
    </div>
  );
  return (
    <></>
  );
}

export default LoginPage;

import { useState } from 'react';
import localContext from '../../local.context';
import { loginAPI } from '../../_redux/actions/user.action';
import { ContainerRedux } from '../../_redux/utils/container.redux';
import AlertUI from '../box/alert.ui';
import LoginFormUI from './ui/loginfrm.ui';
import { useHistory } from 'react-router-dom';
// form with redux
function LoginForm() {    
    return (
        <ContainerRedux            
            mapDispatchToProps={{
                loginAPI: loginAPI
            }}

            context={{ context: localContext }}
        >
            {
                (reduxConnectProps) => (
                    <>                        
                        <LogicForm connect={reduxConnectProps} />
                    </>
                )
            }
        </ContainerRedux>
    );
}


// logic for form
function LogicForm(props) {
    let history = useHistory();
    const { connect } = props;
    const [ status, setStatus] = useState({
        status:null,
        message:''
    });
    // state data form
    const [loginFrm, setLoginFrm] = useState(
        {
            email: "",
            password: ""
        }

    );

    const handleSubmit = async (e) => {
        e.preventDefault();        
    
        // Send request
        let result = await connect.loginAPI(loginFrm.email, loginFrm.password);        
        console.log(result)
        if(result.status === 200) history.replace('/movies');
        if(result.status) setStatus({
            status:result.status,
            message:result.error
        });
    }

    const handleChangeEv = (e) => {
        setLoginFrm(
            {
                ...loginFrm,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <>
            { status.status ? status.status!=200 ? (<AlertUI title={status.status} data={status.message} type={'danger'}/>) : ('') : ('')}
            <LoginFormUI submitEv={(e) => handleSubmit(e)} onChangeEv={(e) => handleChangeEv(e)} />
        </>
    );
}




export default LoginForm;

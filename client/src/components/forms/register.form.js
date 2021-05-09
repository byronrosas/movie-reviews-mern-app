import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import localContext from '../../local.context';
import { registerAPI } from '../../_redux/actions/user.action';
import { ContainerRedux } from '../../_redux/utils/container.redux';
import AlertUI from '../box/alert.ui';
import RegisterFormUI from './ui/registerfrm.ui';

// form with redux
function RegisterForm() {

    return (
        <ContainerRedux            
            mapDispatchToProps={{
                registerAPI: registerAPI
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
    const { connect } = props;
    let history = useHistory();
    const [ status, setStatus] = useState({
        status:null,
        message:''
    });
    const [errors, setErrors] = useState([]);

    // state data form
    const [registerFrm, setRegisterFrm] = useState(
        {
            email: "",
            firstname:"",
            lastname:"",
            password: "",
            confirm:""
        }

    );

    const handleSubmit = async (e) => {
        e.preventDefault();        
        let errors = validation(registerFrm)
        console.log("ERRORS",errors);
        if(errors.length!=0){
            setErrors(errors);
            return;
        }
        // Send request
        let result = await connect.registerAPI({
            email:registerFrm.email, 
            password:registerFrm.password,
            firstname:registerFrm.firstname,
            lastname:registerFrm.lastname
        });        
        if(result.status === 200) history.replace('/movies');

        if(result.status) setStatus({
            status:result.status,
            message:result.error
        });
    }

    const validation =  (frm)=>{
        let toReturn = [];
        if(frm.password != frm.confirm){
            toReturn = ['Passwords do not match '];
        }
        return toReturn;        
    }

    const handleChangeEv = (e) => {
        setRegisterFrm(
            {
                ...registerFrm,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <>
            { status.status ? status.status!=200 ? (<AlertUI title={status.status} data={status.message} type={'danger'}/>) : ('') : ('')}
            { errors.length!= 0 ? (
               errors.map((error)=>{
                return (<AlertUI title={'Error'} data={error} type={'danger'}/>)
                }) 
            ):('')}                  
            <RegisterFormUI submitEv={(e) => handleSubmit(e)} onChangeEv={(e) => handleChangeEv(e)} />
        </>
    );
}




export default RegisterForm;

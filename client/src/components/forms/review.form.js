import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import memoryContext from '../../memory.context';
import { addReviewAPI } from '../../_redux/actions/review.action';
import { PERSISTENCE_STORAGE } from '../../_redux/store';
import { ContainerRedux } from '../../_redux/utils/container.redux';
import AlertUI from '../box/alert.ui';
import ReviewFormUI from './ui/reviewfrm.ui';
// form with redux
function ReviewForm() {

    return (
        <ContainerRedux            
            mapDispatchToProps={{
               addReviewAPI : addReviewAPI
            }}

            context={{ context: memoryContext }}
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
    const { id } = useParams();
    const { connect } = props;
    const history = useHistory();
    const [ status, setStatus] = useState({
        status:null,
        message:''
    });

    const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
    const firstname = data ? data.userLoginReducer.firstname ? data.userLoginReducer.firstname : ''  :  '';
    const lastname = data ? data.userLoginReducer.lastname ? data.userLoginReducer.lastname : ''  :  '';
    const completeName = `${firstname} ${lastname}`;

    // state data form
    const [reviewFrm, setReviewFrm] = useState(
        {            
            rating: 1,
            review: "",
            name:completeName
        }

    );

    const handleSubmit = async (e) => {
        e.preventDefault();                
        // Send request
        let result = await connect.addReviewAPI({
            movie:id,
            rating:reviewFrm.rating,
            review:reviewFrm.review
        });    
        if(result.status === 200) history.replace(`/movies/${id}`);
        if(result.status) setStatus({
            status:result.status,
            message:result.error
        });
    }

    const cancel = () =>{
        history.replace(`/movies/${id}`);
    }

    const handleChangeEv = (e) => {
        setReviewFrm(
            {
                ...reviewFrm,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <>
            { status.status ? status.status!=200 ? (<AlertUI title={status.status} data={status.message} type={'danger'}/>) : ('') : ('')}
            <ReviewFormUI submitEv={(e) => handleSubmit(e)} onChangeEv={(e) => handleChangeEv(e)} data={reviewFrm} cancel={cancel}/>
        </>
    );
}




export default ReviewForm;

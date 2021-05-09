import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import memoryContext from '../../memory.context';
import { addMovieAPI } from '../../_redux/actions/movie.action';
import { PERSISTENCE_STORAGE } from '../../_redux/store';
import { ContainerRedux } from '../../_redux/utils/container.redux';
import AlertUI from '../box/alert.ui';
import MovieFormUI from './ui/moviefrm.ui';

// form with redux
function MovieForm() {

    return (
        <ContainerRedux            
            mapDispatchToProps={{
               addMovieAPI : addMovieAPI
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
    const [movieFrm, setMovieFrm] = useState(
        {
            title: "",
            rating: 1,
            review: "",
            name:completeName
        }

    );

    const handleSubmit = async (e) => {
        e.preventDefault();                
        // Send request
        let result = await connect.addMovieAPI({
            title:movieFrm.title,
            rating:movieFrm.rating,
            review:movieFrm.review
        });    
        if(result.status === 200) history.replace('/movies');
        if(result.status) setStatus({
            status:result.status,
            message:result.error
        });
    }

    const cancel = () =>{
        history.replace('/movies');
    }

    const handleChangeEv = (e) => {
        setMovieFrm(
            {
                ...movieFrm,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <>
            { status.status ? status.status!=200 ? (<AlertUI title={status.status} data={status.message} type={'danger'}/>) : ('') : ('')}
            <MovieFormUI submitEv={(e) => handleSubmit(e)} onChangeEv={(e) => handleChangeEv(e)} data={movieFrm} cancel={cancel}/>
        </>
    );
}




export default MovieForm;

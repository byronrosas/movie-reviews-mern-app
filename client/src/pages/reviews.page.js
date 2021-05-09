import { useState } from 'react';
import '../assets/css/App.css'
import ReviewsTable from '../components/tables/reviews.table';
import AlertUI from '../components/box/alert.ui';
import memoryContext from '../memory.context';
import { getReviewsAPI, removeReviewAPI } from '../_redux/actions/review.action';
import { removeMovieAPI } from '../_redux/actions/movie.action';
import { ContainerRedux } from '../_redux/utils/container.redux';
import {useParams, useHistory} from "react-router-dom"
function ReviewsPage() {
  let { id } = useParams(); 
  let [page, setPage] = useState(0);
  const [ status, setStatus] = useState({
    status:null,
    message:''
  });
  let history = useHistory();

  // add more data
  function more(){    
    setPage(page+1); 
  }




  return (
    <div>
        <div>
          <ContainerRedux
            mapDispatchToProps={{
              getReviewsAPI: getReviewsAPI,
              removeMovieAPI:removeMovieAPI,
              removeReviewAPI:removeReviewAPI
          }}

          context={{ context: memoryContext }}
          >
            {
              (reduxConnectProps)=>(
                  <>
                    { status.status ? status.status!=200 ? (<AlertUI title={status.status} data={status.message} type={'danger'}/>) : ('') : ('')}
                    <ReviewsTable connect={reduxConnectProps} page={page} id={id}/>
                    <button type="button" onClick={more}>Show more</button>
                    <button type="button" onClick={async ()=>{                      
                       let result = await reduxConnectProps.removeMovieAPI(id);
                       console.log("RESULT REMOVE",result);
                       if(result._id) history.replace('/movies');

                       if(result.status) setStatus({
                          status:result.status,
                          message:result.error
                        });                       
                    }}>Delete movie</button>
                  </>
                )                              
            }   
          </ContainerRedux>                    
        </div>
    </div>
  );
}

export default ReviewsPage;

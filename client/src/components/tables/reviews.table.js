import { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { PERSISTENCE_STORAGE } from '../../_redux/store';
// table for list movie
function ReviewsTable(props) {
    const dataStorage = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
    const idUser = dataStorage ? dataStorage.userLoginReducer._id ? dataStorage.userLoginReducer._id : ''  :  '';
    let history = useHistory();
    const { connect, page, id } = props;
    let [data,setData] = useState(null);      
    useEffect(async ()=>{
        let reviewsData = await getReviews();        
        if(reviewsData){
            if(reviewsData.result){
                setData(reviewsData.result.reviews);
            }else{
                alert("Not found");
                history.replace('/movies');
            }         
        }        
    },[]);

    async function getReviews(){
        let reviewsData = await connect.getReviewsAPI(page,id);                                        
        return reviewsData;
    }

    async function removeReview(idReview, index){
        let result = await connect.removeReviewAPI(idReview);
        
        if(result._id) {
            let newData = data;
            newData.splice(index,1);            
            setData([...newData]);
        }
    }
    
    return (
                  
        <div>                          
           <table className="table">
            <thead className="thead-dark">
                <tr>                
                <th scope="col">Reviewer</th>
                <th scope="col">Rating</th>
                <th scope="col">Review</th>
                </tr>
            </thead>
            <tbody>
            {
               data ? data.length!=0 ? data.map((review, index)=>(
                
                <tr key={review._id}>                                                
                <td>
                    <div className="d-flex justify-content-between">   
                        <div>{review.user.firstname} {review.user.lastname}</div>
                        {
                            review.user._id === idUser ? (<FaTrashAlt onClick={()=>{
                            removeReview(review._id, index);
                            }}/>):('')
                        }
                    </div>                    
                </td>
                <td>
                    {review.rating}
                </td>
                <td>
                    {review.review}
                </td>
                </tr> 
                
                )) : (<div>Not reviews</div>) : (<h2>Loading ...</h2>)
            }
               
            </tbody>
            </table>           
       </div> 
    )    
}

export default ReviewsTable;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// table for list movie
function MovieTable(props) {
    const { connect, page } = props;
    let [data,setData] = useState([]); 
         
    useEffect(async ()=>{
        let moviesData = await getMovies();        
        if(moviesData){
            if(moviesData.result)
                setData(moviesData.result.movies);
        }        
    },[]);

    async function getMovies(){
        let moviesData = await connect.getMoviesAPI(page);                                        
        return moviesData;
    }

    return (
                  
        <div>                          
           <table className="table">
            <thead className="thead-dark">
                <tr>                
                <th scope="col">Movie title</th>
                <th scope="col">Avg Rating</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
               data ? data.map((movie)=>(
                
                <tr key={movie._id}>                
                <td>{movie.title}</td>
                <td>{movie.ratingAvg.toFixed(1)}</td>
                <td>
                    <Link to={`/movies/${movie._id}`} onClick={()=>{
                            connect.selectMovie({_id:movie._id,title:movie.title})
                    }} className="btn btn-success mr-2">
                        Read Reviews
                    </Link>
                    |
                    <Link to={`/movies/${movie._id}/review`} onClick={()=>{
                        connect.selectMovie({_id:movie._id,title:movie.title})
                    }} className="btn btn-success">
                        Write a review
                    </Link>
                </td>
                </tr> 
                
               )) : ('not movies')
            }
               
            </tbody>
            </table>           
       </div>
    )
}

export default MovieTable;
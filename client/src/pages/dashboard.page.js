import { useState } from 'react';
import '../assets/css/App.css'
import MovieTable from '../components/tables/movie.table';
import memoryContext from '../memory.context';
import { getMoviesAPI, selectMovie } from '../_redux/actions/movie.action';
import { ContainerRedux } from '../_redux/utils/container.redux';
function DashboardPage() {
  let [page, setPage] = useState(0);

  // add more data
  function more(){    
    setPage(page+1); 
  }

  return (
    <div>
        <div>
          <ContainerRedux
            mapDispatchToProps={{
              getMoviesAPI: getMoviesAPI,
              selectMovie:selectMovie
          }}

          context={{ context: memoryContext }}
          >
            {
              (reduxConnectProps)=>(
                  <>
                    <MovieTable connect={reduxConnectProps} page={page}/>
                  </>
                )                              
            }   
          </ContainerRedux>          
          <button onClick={more}>Show more</button>
        </div>
    </div>
  );
}

export default DashboardPage;
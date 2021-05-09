import './assets/css/App.css';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ContainerRedux } from './_redux/utils/container.redux';
import {store} from './_redux/store';
import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import AddMoviePage from './pages/addMovie.page';
import storeMemory from './_redux/store.memory';
import memoryContext from './memory.context';
import localContext from './local.context';
import MainContainer from './components/box/main.container';
import ButtonAddMovie from './components/box/buttonAddMovie';
import AddReviewPage from './pages/addReview.page';
import ReviewsPage from './pages/reviews.page';
import React from 'react';

function App() {
  return (
    <Provider context={memoryContext} store={storeMemory}> 
    <Provider context={localContext} store={store}>        
    {/* <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={WanderPage} />
        </Switch> */}
 
    <Router>
      <div>            
        {/* <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>              
        </ul> */}
        <Switch>              
          <Route path="/public">
            <div>Hola publico</div>
          </Route>
          <PrivateRoute exact path="/movies"title="Movie List" side={()=>(<ButtonAddMovie/>)}>
            <DashboardPage/>
          </PrivateRoute>
          <PrivateRoute exact path="/movies/new"title="Submit a Movie and a Review">
            <AddMoviePage/>
          </PrivateRoute>
          <PrivateRoute exact path="/movies/:id/review"title={`Add a Review for `}>
            <AddReviewPage/>
          </PrivateRoute>
          <PrivateRoute exact path="/movies/:id"title={`Reviews for `}>
            <ReviewsPage/>
          </PrivateRoute>
          <Route exact path="/">            
            <LoginPage />
          </Route>                   
        </Switch>
      </div>
    </Router>
  
  </Provider>
  </Provider>
  );
}

function PrivateRoute({children={}, title, side, ...rest}) {
  return (    

      <ContainerRedux 
      mapStateToProps={(store)=>{      
        return({
        isLogin:store.userLoginReducer.isLogin
      })}}
      mapDispatchToProps={{}}

      context = {{context:localContext}}
      >
        {(connectProps)=>{                

          return(          
            <Route
            {...rest}
            render={({ location }) =>
              connectProps.isLogin ? (
                <>
                <MainContainer title={title} side={side}>
                {children}
                </MainContainer>              
                </>
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: location }
                  }}
                />
              )
            }
          />
          );
        }}
      </ContainerRedux>    
  );
}



export default App;

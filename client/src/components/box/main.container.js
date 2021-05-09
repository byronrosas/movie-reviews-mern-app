import memoryContext from '../../memory.context';
import { ContainerRedux } from '../../_redux/utils/container.redux';
import HeaderUI from './header.ui';
// container for login users
function MainContainer(props) {
    const { children, title, side } = props;

    return (
        <ContainerRedux
        mapStateToProps={(store)=>{
            console.log(store);      
          return({
            selectedMovie:store.movieReducer
        })}}
        mapDispatchToProps={{}}
  
        context = {{context:memoryContext}}
      >
        {
          (connectProps)=>(            
            <div> 
                <HeaderUI>
                    <div className="p-4 border border-4 m-2">
                        <div class="d-flex justify-content-between">
                            <h3><>{title} {connectProps.selectedMovie.title ? connectProps.selectedMovie.title : ''}</></h3>
                            
                            {
                                side ? (side()) : ('')
                            }
                        </div>
                        {children}
                    </div>                    
                </HeaderUI>                
            </div>                    
          )
        }
      </ContainerRedux>        
    )
}

export default MainContainer;
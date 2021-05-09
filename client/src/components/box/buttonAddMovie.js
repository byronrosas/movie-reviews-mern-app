import { Link } from "react-router-dom";
// container for login users
function ButtonAddMovie(props) {    

    return (
        <>
            <Link to="/movies/new" className="btn btn-primary">
                Add a New Movie
            </Link>                
            
        </>
    )
}

export default ButtonAddMovie;
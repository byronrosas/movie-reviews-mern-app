import '../../../assets/css/forms.css'

// ui for form movie
function MovieFormUI(props) {
    const { submitEv, cancel, onChangeEv, data } = props;

    return (
        <div className="login-form">            
            <form onSubmit={submitEv}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Movie title:</label>
                    <input type="text" onChange={onChangeEv} name="title" className="form-control" id="title" aria-describedby="titleHelp" required/>                    
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your name:</label>
                    <input type="text" value={data.name} onChange={onChangeEv} name="name" className="form-control" id="name" aria-describedby="nameHelp" disabled required/>                    
                </div>

                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating:</label>
                    <select className="custom-select custom-select-lg mb-3" onChange={onChangeEv} name="rating" required>                        
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Your review</label>
                    <textarea className="form-control" onChange={onChangeEv} id="exampleFormControlTextarea1" name="review" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-primary"onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default MovieFormUI;
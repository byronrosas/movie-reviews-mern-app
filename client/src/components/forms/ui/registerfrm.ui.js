import '../../../assets/css/forms.css'

// ui for form login
function RegisterFormUI(props) {
    const { submitEv, onChangeEv } = props;

    return (
        <div className="login-form">
            <h3>Register</h3>
            <form onSubmit={submitEv}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Firstname:</label>
                    <input type="text" onChange={onChangeEv} name="firstname" className="form-control" id="firstname" aria-describedby="firstnameHelp" />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Lastname:</label>
                    <input type="text" onChange={onChangeEv} name="lastname" className="form-control" id="lastname" aria-describedby="lastnameHelp" />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" onChange={onChangeEv} name="email" className="form-control" id="email" aria-describedby="emailHelp" />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" onChange={onChangeEv} name="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm" className="form-label">Confirm Password:</label>
                    <input type="password" onChange={onChangeEv} name="confirm" className="form-control" id="confirm" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default RegisterFormUI;
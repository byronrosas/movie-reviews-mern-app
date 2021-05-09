import '../../../assets/css/forms.css'

// ui for form login
function LoginFormUI(props) {
    const { submitEv, onChangeEv } = props;

    return (
        <div className="login-form">
            <h3>Login</h3>
            <form onSubmit={submitEv}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" onChange={onChangeEv} name="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" onChange={onChangeEv} name="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LoginFormUI;
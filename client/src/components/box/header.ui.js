import ButtonLogout from "./buttonLogout";

// ui for alerts
function HeaderUI(props) {
    const { children } = props;

    return (
        <>
            <div>
                <div>                    
                    <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <h1>Moldy Tomatoes</h1>
                    </li>
                    <li className="nav-item">
                        <ButtonLogout/>
                    </li>
                    </ul>
                </div>                
                {children}
            </div>
        </>
    )
}

export default HeaderUI;
// ui for alerts
function AlertUI(props) {
    const { title,data, type } = props;

    return (
        <>
            <div className={"alert alert-"+type} role="alert">
                <strong>{title}:</strong>
                {data}
            </div>
        </>
    )
}

export default AlertUI;
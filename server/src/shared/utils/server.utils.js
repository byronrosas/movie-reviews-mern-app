export function onInitError(service){    
    return (error)=>{
        console.log(service+"=>>",error);
        throw error;
    }    
}

export function onInitListenSuccess(server){
    return ()=>{
        let dataServer = server;
        console.log('data-server',dataServer);
    }
}
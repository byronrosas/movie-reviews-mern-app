import React from 'react';
import { connect } from 'react-redux';

export function ContainerRedux(props) {
    const HOC = connect(props.mapStateToProps,props.mapDispatchToProps,null,props.context)(
        (propsInner)=>{            
            return props.children ? props.children(propsInner) : null;
        }
    );

    return(<HOC/>);
}

import React from 'react';
import Loader from './Loader';

const withLoader = (Component) => {
    const ComposedComponent = (props) => (
        props.isLoading ? (
            <div className="loaderWrapper">
                <Loader />
            </div> 
        ) : (
            <Component {...props}/>
        )
    );
    return ComposedComponent;
}

export default withLoader;
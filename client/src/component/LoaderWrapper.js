import React from 'react';
import Loader from './Loader';

// const LoaderWrapper = (props) => {
//     const { isLoading, children } = props;
//     // const isLoading = props.isLoading;
//     // const children = props.children;
//     return (
//         <>
//             {
//                 isLoading ? (
//                 <div className="loginWrapper">
//                     <Loader />
//                 </div> 
//                 ) : (
//                     <>
//                         {children}
//                     </>
//                 )
//             }
//         </>
//     );
// };

const LoaderWrapper = ({ isLoading, children }) => (
    isLoading ? (
        <div className="loaderWrapper">
            <Loader />
        </div> 
    ) : (
        <>
            {children}
        </>
    )
);

export default LoaderWrapper;
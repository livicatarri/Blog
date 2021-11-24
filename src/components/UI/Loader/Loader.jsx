import React from 'react';
import cl from './Loader.module.css';

const Loader = () =>  {
    return (
        <div className={cl.loader}>
            <div className="load">Loading . . .</div>
            <div className="hands">

            </div>
            <div className="body">

            </div>
            <div className="head">
                <div className="eye">

                </div>
            </div>
        </div>
    );
};

export default Loader;
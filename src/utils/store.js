import React, { useState } from 'react';

export const RightContext = React.createContext([]);
export const DescriptionContext = React.createContext([]);

const Store = ({ children }) => {
    const [right, setRight] = useState([]);
    const [description, setDescription] = useState()

    return (
        <RightContext.Provider value={[right, setRight]}>
            <DescriptionContext.Provider value={[description, setDescription]}>
                {children}
            </DescriptionContext.Provider>
        </RightContext.Provider>
    );
};

export default Store;

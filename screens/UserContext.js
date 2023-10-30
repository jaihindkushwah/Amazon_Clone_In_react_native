const { useState } = require("react");
const { createContext } = require("react");

const UserType=createContext(null);

const UserContext=({children})=>{
    const [userId,setUserId]=useState("");
    return(
        <UserType.Provider value={{userId,setUserId}}>
            {children}
        </UserType.Provider>
    )
}
export {UserType,UserContext};


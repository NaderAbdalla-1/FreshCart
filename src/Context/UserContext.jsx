import React, { createContext ,useState} from 'react'

export let userContext= createContext()
export default function UserContext({children}) {
    const [token, settoken] = useState(localStorage.getItem("token"));
  
    
    localStorage.getItem(token)
  return (
    <>
    <userContext.Provider value={{token,settoken}}>
    {children}
    </userContext.Provider>
   
    </>

  )
}

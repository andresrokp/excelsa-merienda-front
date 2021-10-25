// import DashboardWHTP from './Components/Login/Login';

import { MainRouter } from "./Routes/MainRouter";
import { UserContext } from "./Components/Context/UserContext";
import { useEffect, useState } from "react";


function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("elsujetoencuestion");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  
  return (  
    <UserContext.Provider value={{user, setUser}}>
      <MainRouter/>
    </UserContext.Provider>
  );
}

export default App;

//this is a test yes this is a test
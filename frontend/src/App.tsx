import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UserAuthForm from "@/components/form/UserAuthForm";
import { Toaster } from "react-hot-toast";
import { UserContext } from "@/hooks/UserContext";
import { useEffect, useState } from "react";
import { lookInSession } from "@/lib/session";
import { TUserAuth } from "./lib/types";


function App() {
  const [userAuth, setUserAuth] = useState<TUserAuth>({});



  useEffect(() => {
    const userInSession = lookInSession("user")
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({})
  }, [])

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
      <Toaster />
    </UserContext.Provider>
  )
}

export default App

import { TUserAuth } from "@/lib/types";
import { Dispatch, SetStateAction, createContext } from "react";

type UserContextType = {
    userAuth: TUserAuth
    setUserAuth: Dispatch<SetStateAction<TUserAuth>>
}

export const UserContext = createContext<UserContextType>(null!) 
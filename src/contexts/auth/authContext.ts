import { FormUserData } from "@App/components/FormUser";
import { createContext, useContext } from "react";

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (data: FormUserData) => Promise<FormUserSubmitResult>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
    return useContext(AuthContext);
}

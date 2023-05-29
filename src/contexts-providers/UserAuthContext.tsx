import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  Auth,
} from "firebase/auth";
import { auth } from "../firebase";

//type

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type UserAuthContext = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  setUser: (user: User) => void;
};

const userAuthContext = createContext<UserAuthContext | null>(null);

export function UserAuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function logIn(email: string, password: string) {
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    });
  }

  async function logOut() {
    return signOut(auth);
  }

  return (
    <userAuthContext.Provider value={{ signUp, logIn, user, setUser, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext) as UserAuthContext;
}

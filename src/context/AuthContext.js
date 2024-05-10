/* eslint-disable import/no-extraneous-dependencies */

//---------------------------------------------------------------------
// React, Next and other third-party modules imports
//---------------------------------------------------------------------
import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { doc, setDoc, getDoc, collection, getFirestore } from 'firebase/firestore';
import { useMemo, useEffect, useReducer, useContext, useCallback, createContext } from 'react';
import {
  signOut,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_API } from 'src/config-global';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const STORAGE = getStorage(firebaseApp);

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userProfile = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userProfile);

          const profile = docSnap.data();

          dispatch({
            type: 'INITIAL',
            payload: {
              user: {
                ...user,
                ...profile,
                id: user.uid,
                role: user?.isPropertyOwner ? 'propertyOwner' : 'admin',
              },
            },
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  // ---------------------------------------------------------------------
  //  Local states
  // ---------------------------------------------------------------------

  //--------------------------------------------------------------------
  // Side Effects
  //--------------------------------------------------------------------
  useEffect(() => {
    initialize();
  }, [initialize]);
  //--------------------------------------------------------------------
  // Callbacks
  //--------------------------------------------------------------------
  // LOGIN
  const login = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const newUser = await createUserWithEmailAndPassword(AUTH, email, password);

    // await sendEmailVerification(newUser.user);

    const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

    await setDoc(userProfile, {
      uid: newUser.user?.uid,
      email,
      displayName: `${firstName} ${lastName}`,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;
  //--------------------------------------------------------------------
  // Return
  //--------------------------------------------------------------------
  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      // isPropertyOwner,
      //
      login,
      logout,
      register,
      forgotPassword,
      loginWithGoogle,
      // loginWithGithub,
      // loginWithTwitter,
    }),
    [status, state.user, login, logout, register, forgotPassword, loginWithGoogle]
  );
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

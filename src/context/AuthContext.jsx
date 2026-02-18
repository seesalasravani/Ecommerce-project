import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register function
    const register = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile with name
            await updateProfile(user, { displayName: name });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                createdAt: new Date().toISOString(),
                role: 'user' // Default role
            });

            return user;
        } catch (error) {
            if (error.code === 'auth/configuration-not-found') {
                throw new Error('Email/Password authentication is not enabled. Please enable it in Firebase Console.');
            }
            throw error;
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/configuration-not-found') {
                throw new Error('Email/Password authentication is not enabled. Please enable it in Firebase Console.');
            }
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

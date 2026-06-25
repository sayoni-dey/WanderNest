import { createContext, useContext, useState, useEffect, Children } from "react";
import api from '../services/api.js';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token , setToken] = useState(null);
    const [loading , setLoading] = useState(true);

    //login handler 
    const login = async (email , password)=>{
        try {
            const response = await api.post('/login', {email,password});
            setUser(response.data.user);
            setToken(response.data.accessToken);
            return {success : true};
        }catch(err){
            return {
                success: false,
                message: error.response?.data?.message || 'Login Failed'
            };
        }
    };

    const register = async(userData) => {
        try {
            const response = await api.post('/register', userData);
            if(register.data.success){
                setUser(response.data.user);
                setToken(response.data.accessToken);
                return {success : true};
            }
        }catch(err){
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

        // Logout handler
    const logout = async () => {
        try {
        await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setToken(null); // Clear token from memory completely
        }
    };

    return (
        <AuthContext.Provider value ={{user, token, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
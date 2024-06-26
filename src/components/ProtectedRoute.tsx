import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../types/rootState';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Loader from './loader/Loader';
export interface ChildrenProps {
    children: React.ReactNode
}
const ProtectedRoute: React.FC<ChildrenProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = useSelector((state: RootState) => state.auth.status);
    useEffect(() => {
        if (!isActive && location.pathname === "/dash") {
        
                navigate('/login')

        } else {
            if (location.pathname === "/login" && isActive) {
                navigate("/dash")
            }
        }
    }, [isActive, navigate]);
    return children;
}

export default ProtectedRoute
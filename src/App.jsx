import { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin, signout } from "./redux/authSlice"; // Import Redux actions
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";


export const newContext = createContext();

function App() {
    const [isCollapse, setIsCollapse] = useState(false);
    const dispatch = useDispatch();
    const isSigned = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.user?.token); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            dispatch(signin({ token })); 
        }
        setLoading(false);
    }, [token, dispatch]); 

    function handleCollapse() {
        setIsCollapse((prevState) => !prevState);
    }

    function handleSignIn(token) {
        dispatch(signin({ token }));
    }

    function handleSignOut() {
        dispatch(signout());
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <newContext.Provider value={{ isCollapse, handleCollapse, isSigned, handleSignIn, handleSignOut }}>
                <Header />
                <div className="home">
                    <Sidebar />
                    <div className="videos" 
                        style={{
                            marginLeft: isCollapse ? "6vw" : "15vw", // Adjust margin dynamically
                            width: isCollapse ? "calc(100vw - 8vw)" : "calc(100vw - 10vw)", // Adjust width accordingly
                        }}
                        >
                        <Outlet />
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
        </newContext.Provider>
    );
}

export default App;

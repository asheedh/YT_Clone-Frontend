import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { FaMicrophone, FaYoutube, FaGoogle, FaKeyboard } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { BsList } from "react-icons/bs";
import { newContext } from "../App";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { PiUserCircleThin } from "react-icons/pi";
import { CiStreamOn, CiSettings, CiLocationOn } from "react-icons/ci";
import { BiEdit, BiSolidPurchaseTag } from "react-icons/bi";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { SiYoutubestudio } from "react-icons/si";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback, MdSwitchAccount, MdSecurity } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";

function Header() {
    const { handleCollapse } = useContext(newContext);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isSigned = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state.auth.user?._id);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isProfileClicked, setIsProfileClicked] = useState(false);
    const [isCreateClicked, setIsCreateClicked] = useState(false);

    const profileRef = useRef(null);
    const createRef = useRef(null);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        axios.get( userId ? `http://localhost:5200/api/users/${userId}`: null )
            .then((response) => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    function handleIsClicked(menuType) {
        if (menuType === "create") {
            setIsCreateClicked((prev) => !prev);
            setIsProfileClicked(false);
        } else if (menuType === "profile") {
            setIsProfileClicked((prev) => !prev);
            setIsCreateClicked(false);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isProfileClicked && profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileClicked(false);
            }
            if (isCreateClicked && createRef.current && !createRef.current.contains(event.target)) {
                setIsCreateClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileClicked, isCreateClicked]);

    const handleSearchSubmit = () => {
        console.log("searched")
    };

    return (
        <div className="Header">
            <div className="Header-Container1">
                <button className="menu" onClick={handleCollapse}><BsList /></button>
                <div className="logo"><FaYoutube /> <p>YouTube</p></div>
            </div>
            <div className="searchContainer">
                <div className="search-field">
                    <input type="text" placeholder="Search" id="search-bar" />
                    <button type="submit" onClick={handleSearchSubmit} className="search-button">
                        <GoSearch size={20} />
                    </button>
                </div>
                <button className="microphone"><FaMicrophone /></button>
            </div>
            {isSigned ? (
                <div className="user-actions">
                    <div ref={createRef}>
                        <button id="create" onClick={() => handleIsClicked("create")}>
                            <FiPlus /> <span> Create </span>
                        </button>
                        {isCreateClicked && (
                            <div className="dropdown-menu2">
                                <button className="dropdown-item" onClick={() => navigate('#')}>
                                    <AiOutlinePlaySquare /> <span>Upload video</span>
                                </button>
                                <button className="dropdown-item">
                                    <CiStreamOn /><span>Go live</span>
                                </button>
                                <button className="dropdown-item">
                                    <BiEdit /><span>Create post</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div ref={profileRef}>
                        <button className="profile" onClick={() => handleIsClicked("profile")}>
                            {user?.avatar ? (
                                <img src={user?.avatar} alt="Profile" className="profile-pic" />
                            ) : (
                                <div className="profile-placeholder">
                                    {`${user?.userName?.charAt(0).toUpperCase()}`}
                                </div>
                            )}
                        </button>

                        {isProfileClicked && (
                            <div className="dropdown-menu">
                                <div className="userProfile">
                                    {user?.avatar ? (
                                        <img src={user?.avatar} alt="Profile" className="profile-pic" />
                                    ) : (
                                        <div className="profile-placeholder">
                                            {`${user?.userName?.charAt(0).toUpperCase()}`}
                                        </div>
                                    )}
                                    <div className="dropdown-div">
                                        <p id="userName">{user?.userName}</p>
                                        {user && user.channel?.length > 0 ? (
                                            <>
                                                <Link>View your Profile</Link>
                                                <br />
                                                <Link>View your channel</Link>
                                            </>

                                        ) : (
                                            <Link>Create your channel</Link>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p> <FaGoogle /> <span> Google Account </span> </p>
                                    <p> <MdSwitchAccount /> <span> Switch Account </span> </p>
                                    <Link to={'/'}>
                                        <button className="dropdown-item" onClick={() => dispatch(signout())}>
                                            <RiLogoutBoxRLine /><span> Logout</span>
                                        </button>
                                    </Link>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p> <SiYoutubestudio /> <span> YouTube Studio </span> </p>
                                    <p> <BiSolidPurchaseTag /><span> Purchases and memberships </span> </p>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p> <MdSecurity /> <span> Your data in YouTube </span> </p>
                                    <p> <IoLanguageOutline /> <span> Language: English </span> </p>
                                    <p> <CiLocationOn /> <span> Location: India </span> </p>
                                    <p> <FaKeyboard /> <span> Keyboard shortcuts </span> </p>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p><CiSettings /> <span> Settings </span> </p>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p><IoIosHelpCircleOutline /> <span> Help </span> </p>
                                    <p><MdOutlineFeedback /> <span> Send feedback </span> </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Link to={'/login'}>
                    <button id="create"><PiUserCircleThin /> <span> Sign in </span> </button>
                </Link>
            )}
        </div>
    );
}

export default Header;

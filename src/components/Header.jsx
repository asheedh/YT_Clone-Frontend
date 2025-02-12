
import "../styles/header.css";
import { FaSearch, FaMicrophone, FaYoutube, FaGoogle, FaKeyboard } from "react-icons/fa";
import { BsList } from "react-icons/bs";
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

    return (
        <div className="Header">
            <div className="Header-Container1">
                <button className="menu" ><BsList /></button>
                <div className="logo"><FaYoutube /> <p>YouTube</p></div>
            </div>
            <div className="searchContainer">
                <div className="search-field">
                    <input className="search-bar" placeholder="Search" />
                    <button> <FaSearch /> </button>
                </div>
                <button className="microphone"><FaMicrophone /></button>
            </div>

                <div className="user-actions">
                    <div>
                        <button id="create">
                            <FiPlus /> <span> Create </span>
                        </button>
                            <div className="dropdown-menu2">
                                <Link to={"#"}>
                                    <button className="dropdown-item"><AiOutlinePlaySquare /> <span>Upload video</span></button>
                                </Link>
                                <button className="dropdown-item"><CiStreamOn /><span>Go live</span></button>
                                <button className="dropdown-item"><BiEdit /><span>Create post</span></button>
                            </div>
                    </div>

                    <div>
                        <button className="profile">
                                <img src={'#'} alt="Profile" className="profile-pic" />
                                <div className="profile-placeholder"> profile
                                </div>

                        </button>

                            <div className="dropdown-menu">
                                <div className="userProfile">
                                        <img src={'#'} alt="Profile" className="profile-pic" />
    
                                        <div className="profile-placeholder">
                                           placeholder
                                        </div>
        
                                    <div className="dropdown-div">
                                        <p id="userName">username</p>
                                            <Link to={'#'}>View your channel</Link>
                                            <Link to={"#"}>Create your channel</Link>
                                    </div>
                                </div>
                                <hr />
                                <div className="dropdown-div">
                                    <p> <FaGoogle /> <span> Google Account </span> </p>
                                    <p> <MdSwitchAccount /> <span> Switch Account </span> </p>
                                    <Link to={'/'}>
                                        <button className="dropdown-item">
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
                    </div>
                </div>
                <Link to={'#'}>
                    <button id="create"><PiUserCircleThin /> <span> Sign in </span> </button>
                </Link>

        </div>
    );
}

export default Header;

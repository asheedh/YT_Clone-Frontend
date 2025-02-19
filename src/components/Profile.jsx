import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/authSlice";
import Loader from "../components/Loader";
import "../styles/profile.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.channel) return; // Prevents the request if user.channel is undefined

    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:5200/api/channel/${user.channel}`);
        setChannelData(response.data.channel);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [user?.channel]); // Dependency array ensures the effect runs only when user.channel changes
  console.log("channel data",channelData)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-container"> 
                {user?.avatar ? (
                <div className="image-container">
                    <img src={user?.avatar} alt="Profile" className="profile-pic" />   
                </div>
                ) :(
                    <div className="profile-placeholder">
                        {`${user?.userName?.charAt(0).toUpperCase()}`}
                    </div>
                )}
                <div className="profile-details">
                    <h1>{user?.userName || "channel"}</h1>
                    <p>Channel : {channelData.channelName}</p>
                    <br /> 
                    <div className="custButtons" >
                      <Link to={`/channel/${user?.channel}`}>
                        <button>View Channel</button>
                      </Link>
                      <Link to={'/'}>
                        <button onClick={() => dispatch(signout())}> Logout </button>
                      </Link>
                    </div>
                </div>    
        </div>
      )
    } 
  </>
  )
};

export default Profile;
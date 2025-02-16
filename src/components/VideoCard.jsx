import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/videoCard.css";
import time from '../utils/time';
import formatViews from '../utils/formatViews';
import { newContext } from "../App";
function VideoCard({ videoId, title, thumbnailUrl, channelId, views, createdAt }) {
    const [channelData, setChannelData] = useState({});
    const { isCollapse } = useContext(newContext);

    useEffect(() => {
        // Fetch channel details
        let isMounted = true;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    channelId ? `http://localhost:5200/api/channel/${channelId}` : null
                );
                if (data) {
                    setChannelData(data.channel);
                }
            } catch (error) {
                console.error("Error fetching channel data:", error);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [channelId]);
    
    return (
        <div className="VideoCard"
            style={{
                width: isCollapse ? "330px" : "400px", // Adjust width accordingly
                height: isCollapse ? "280px" : "350px",
            }}
        >
            {/* Thumbnail */}
            <Link to={`/watch/${videoId}`}>
                <img src={thumbnailUrl || ""} alt={title} className="thumbnailImage" />
            </Link>

            {/* Video Info */}
            <div className="videIinfo">
                <img className="channelLogo" src={channelData.channelLogo || " img "} />
                <div className="videoDetails">
                <h3 className="videoTitle">{title.length > 72 ? title.slice(0, 72) + "..." : title}</h3>
                <p className="channelName">{channelData?.channelName}</p>
                    <span className="views">{formatViews(views)} Views • {time(createdAt)}</span>
                </div>
            </div>


        </div>
    );
}

export default VideoCard;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatViews from "../utils/formatViews";
import time from "../utils/time";
import "../styles/searchVideoView.css";

const SearchVideoView = ({ item }) => {
  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          item?.channelId ? `http://localhost:5200/api/channel/${item?.channelId}` : null
        );
        if (data) {
          setChannelData(data.channel);
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    fetchData();
  }, [item?.channelId]);

  return (
    <Link to={`/video/${item?._id}`} className="video-container">
      <img className="thumbnail" src={item?.thumbnailUrl} alt="video thumbnail" />

      <div className="video-data">
        <div className="video-info">
          <h2 className="video-title">{item?.title}</h2>
          <p className="video-stats">
            {formatViews(item?.views)} views • {time(item?.createdAt)}
          </p>
        </div>

        <div className="channel-info">
          <img className="channel-logo" src={channelData?.channelLogo} alt="channel logo" />
          <h2 className="channel-name">{channelData?.channelName}</h2>
        </div>

        <p className="video-description">
          {item?.description.length > 198 ? item?.description.slice(0, 198) + "..." : item?.description}
        </p>
      </div>
    </Link>

  );
};

export default SearchVideoView;

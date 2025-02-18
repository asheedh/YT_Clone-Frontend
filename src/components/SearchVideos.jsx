import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchVideoView from "./SearchVideoView";
import "../styles/SearchVideos.css";

const SearchVideos = () => {
  const [videoResults, setVideoResults] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5200/api/video/search/${params.searchItem}`
        );
        if (data) {
          setVideoResults(data.videos);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
    fetchVideos();
  }, [params]);

  return (
    <div className="results-container">
      <h2 className="results-heading">Search Results for: "{params.searchItem}"</h2>
      <div className="results-list">
        {videoResults && videoResults.length >= 1 ? (
          videoResults.map((item) => 
          <SearchVideoView key={item._id} 
            item={item}
            videoId={item._id}
            title={item.title}
            channelId={item.channelId}
            thumbnailUrl={item.thumbnailUrl}
            views={item.views}
            createdAt={item.createdAt} 
            />)
        ) : (
          <h2 className="no-results">No videos matched your search</h2>
        )}
      </div>
    </div>
  );
};

export default SearchVideos;

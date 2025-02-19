import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import "../styles/videoGrid.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";



function VideoGrid() {
  const isSigned = useSelector((state) => state.auth.isAuthenticated);

  const [videos, setVideos] = useState([]);
  const [filteredData, setFilteredData] = useState(videos);
  const [loading, setLoading] = useState(false)

  // Fetch videos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:5200/api/video/"
        );
        if (data) {
          setVideos(data.videos);
          setFilteredData(data.videos);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (filteredItem) => {
    if (filteredItem === "All") {
      setFilteredData(videos);
    } else {
      setFilteredData(
        videos.filter(
          (item) => item.category.toLowerCase() === filteredItem.toLowerCase()
        )
      );
    }
  };
  // if (!isSigned) {
  //     return (
  //         <div className="extraData">
  //             <h1>Try searching to get started</h1>
  //             <p>Start watching videos to help us build a feed of videos you'll love.</p>
  //         </div>
  //     ); 
  // }  

  const categories = [
    "All",
    "Travel",
    "Fitness",
    "Entertainment",
    "Movies",
    "Food",
    "Automobile",
    "Songs",
    "Finance",
    "Gaming",
    "Technology",
    "Anime"
  ];

  return (
    <>
      {/*  Category  */}
      <div className="category">
        {categories?.map((item) => (
          <span onClick={() => handleFilter(item)} key={item} className="category-item" >
            {item}
          </span>
        ))}
      </div>

      <div className="video-container1">
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredData && filteredData.length >= 1 ? (
              filteredData.map((item) => (
                <VideoCard
                  key={item._id}
                  videoId={item._id}
                  title={item.title}
                  channelId={item.channelId}
                  thumbnailUrl={item.thumbnailUrl}
                  views={item.views}
                  createdAt={item.createdAt}
                />
              ))
            ) : (
              <h2>No videos to display</h2>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default VideoGrid;

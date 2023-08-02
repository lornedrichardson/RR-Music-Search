import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function AlbumView() {
  const {id} = useParams();
  const [albumData, setAlbumData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/song/${id}`);
      const resData = await response.json();
      setAlbumData(resData.results);
    }
    fetchData();
  }, [id]);

  const navButtons = () => {
    return (
      <div>
        <button onClick={() => {history.push('/')}}>Home</button>
        <button onClick={() => {history.goBack()}}>Back</button>
      </div>
    );
  }

  const allSongs = albumData.filter(item => item.kind === 'song')
  .map((album, i) => {
    return (
      <div key={i}>{album.trackName}</div>
    );
  });

  return (
    <div>
      <h2>{albumData[0].collectionName}</h2>
      {navButtons()}
      {allSongs}
    </div>
  );
}

export default AlbumView;
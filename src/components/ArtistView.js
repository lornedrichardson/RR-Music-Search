import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

const ArtistView = () => {
  const {id} = useParams();
  const [artistData, setArtistData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/album/${id}`);
      const resData = await response.json();
      setArtistData(resData.results);
    }
    fetchData();
  }, [id]);

  const allAlbums = artistData.filter(item => item.collectionType === 'Album')
  .map((album, i) => {
    return (
      <div key={i}>
        <Link to={`/album/${album.collectionId}`}>
          <p>{album.collectionName}</p>
        </Link>
      </div>
    );
  });

  const navButtons = () => {
    return (
      <div>
        <button onClick={() => {history.push('/')}}>Home</button>
        <button onClick={() => {history.goBack()}}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{artistData[0].artistName}</h2>
      {navButtons()}
      {allAlbums}
    </div>
  );
}

export default ArtistView;
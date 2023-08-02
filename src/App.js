import './App.css';
import { useRef, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import { createResource } from './resource';

const App = () => {
	let searchInput = useRef('');
	let [message, setMessage] = useState('Search for Music!');
	let [data, setData] = useState(null);

	const handleSearch = (e, term) => {
		e.preventDefault();
		setData(createResource(term, 'main'));
	}

	const renderGallery = () => {
		if(data) {
			return (
				<Gallery />
			);
		}
	}

	return (
		<div className="App">
			{message}
			<Router>
				<Route exact path={"/"}>
					<SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
						<SearchBar />
					</SearchContext.Provider>
					<DataContext.Provider value={data}>
						{renderGallery()}
					</DataContext.Provider>
				</Route>
				<Route path='/album/:id'>
					<AlbumView />
				</Route>
				<Route path='/artist/:id'>
					<ArtistView />
				</Route>
			</Router>
		</div>
  );
}

export default App;
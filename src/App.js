import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import EpisodeDetail from './pages/EpisodeDetail';
import PodcastDetail from './pages/PodcastDetail';
import PodcastList from './pages/PodcastList';

function App() {

  return (
    <>
      <Header />
      <section className="layout">
        <Routes>
          <Route exact path="/" element={<PodcastList />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        </Routes>
      </section>


    </>
  );
}

export default App;

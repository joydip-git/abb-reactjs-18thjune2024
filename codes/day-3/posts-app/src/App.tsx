import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import PostList from './post-list/PostList';
//import PostDetail from './post-detail/PostDetail';
import PageNotFound from './page-not-found/PageNotFound';
import Home from './home/Home';
import PostDetail from './post-detail/PostDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path='' element={<Home />} />
        <Route path='posts'>
          <Route path='' element={<PostList />} />
          {/* <Route path=':id/data/:x' element={<PostDetail />} /> */}
          <Route path='view' element={<PostDetail />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Outlet />
    </div>
  );
}

export default App;

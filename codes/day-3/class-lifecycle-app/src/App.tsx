import { useState } from 'react';
import './App.css';
import PostList from './post-list/PostList';

function App() {

  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <button type="button" onClick={() => setShow((status) => !status)}>
        {
          show ? 'Hide' : 'Show'
        }
      </button>
      {
        show && <PostList />
      }
    </div>
  );
}

export default App;

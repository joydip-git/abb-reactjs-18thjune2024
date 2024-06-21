import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import appStore from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
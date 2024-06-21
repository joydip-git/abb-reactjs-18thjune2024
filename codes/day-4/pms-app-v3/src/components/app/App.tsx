import './App.css';
import AppRoutes from '../../routes/AppRoutes';
import DashBoard from '../common/dash-board/DashBoard';

function App() {
  return (
    <div>
      <DashBoard />
      <br />
      <AppRoutes />
    </div>
  );
}

export default App;

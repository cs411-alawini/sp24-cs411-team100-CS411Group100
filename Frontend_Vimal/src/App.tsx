import { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.scss';
import { getAccessToken, setLocationBeforeRedirect } from './components/Authorization';
import { setToken } from './services/http';
const AppNavBar = lazy(() => import('./components/Common/Layout/AppNavBar'));
const AppRoutes = lazy(() => import('./components/Common/Route/AppRoutes'))

const App = () => {
  const { t } = useTranslation();
  setToken(getAccessToken());
  setLocationBeforeRedirect();
  const [error, setError] = useState('');
  const [menuCollapse, setMenuCollapse] = useState(true)


  const toggleMenuCollapse = (value = !menuCollapse) => {
    setMenuCollapse(value);
  }

  const onMouseMove = (e: any) => {
    const root = document.documentElement;
    root.style.setProperty('--mouse-x', (e.clientX + 20) + 'px');
    root.style.setProperty('--mouse-y', (e.clientY + 20) + 'px');
  }
  return (
    <div className="app-container" onMouseMove={onMouseMove}>
      <AppNavBar toggleMenuCollapse={toggleMenuCollapse}></AppNavBar>
      <AppRoutes toggleMenuCollapse={toggleMenuCollapse} />
    </div>
  );;

}

export default App;

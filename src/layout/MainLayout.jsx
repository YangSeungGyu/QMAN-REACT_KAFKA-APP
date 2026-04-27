import { useState } from 'react';
import { Outlet} from 'react-router-dom';
import SideLayout from '@/layout/SideLayout';
import TopLayout from '@/layout/TopLayout';

function MainLayout() {

  const [mainLayoutContainer, setMainLayoutContainer] = useState(
    {
      titleColor: '#eee'
      ,titleTxt: 'React-Sample'
    }
  );

  return (
    <div className="layout-container">
      <header>
        <TopLayout titleColor={mainLayoutContainer.titleColor} titleTxt={mainLayoutContainer.titleTxt} /> 
      </header>

      <div className="main-wrapper">
        <SideLayout /> 
        <main className="page-content">
          <Outlet context={{mainLayoutContainer,setMainLayoutContainer}} />
        </main>
      </div>

      <footer>© 2026 React Study</footer>
    </div>
  );
}

export default MainLayout;
import React from 'react';
import Tabs from '../components/Tabs.js';

import UsersOverview from '../components/Admin/UsersOverview';

const tabs = [{ label: 'Users', component: <UsersOverview />, id: 1 }];

const AdminPage = () => {
  return (
    <main className="main">
      <div className="wrapper--app">
        <div className="app__header">
          <h1 id="adminPanelTitle" className="heading-title">
            Account
          </h1>
        </div>
        <div className="app__content">
          <Tabs id="adminPanel" tabs={tabs} />
        </div>
      </div>
    </main>
  );
};

export default AdminPage;

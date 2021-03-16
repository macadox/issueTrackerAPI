import React from 'react';
import Tabs from '../components/Tabs.js';

import UserProfile from '../components/Account/UserProfile';
import Security from '../components/Account/Security';
import Placeholder from '../components/Account/Placeholder';

const tabs = [
  { label: 'User profile', component: <UserProfile />, id: 1 },
  { label: 'Security & Passwords', component: <Security />, id: 2 },
  { label: 'Account preferences', component: <Placeholder />, id: 3 },
  { label: 'Connected Apps', component: <Placeholder />, id: 4 },
  { label: 'Blacklist', component: <Placeholder />, id: 5 },
];

const AccountPage = () => {
  return (
    <main className="main">
      <div className="wrapper--app">
        <div className="app__header">
          <h1 id="userAccountTitle" className="heading-title">
            Account
          </h1>
        </div>
        <div className="app__content">
          <Tabs id="userAccount" tabs={tabs} />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;

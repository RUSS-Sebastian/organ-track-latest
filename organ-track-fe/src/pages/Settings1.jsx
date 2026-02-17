import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
      navigate('/login');
    } else if (path === 'edit-profile') {
      navigate('/edit-profile');
    } else {
      console.log(`Navigating to: ${path}`);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-sections">
        {/* Account Section */}
        <div className="settings-section">
          <h2 className="section-title">Account</h2>
          <ul className="settings-list">
            <li className="settings-item" onClick={() => handleNavigation('edit-profile')}>
              <span>Edit profile</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item" onClick={() => handleNavigation('security')}>
              <span>Security</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item" onClick={() => handleNavigation('notifications')}>
              <span>Notifications</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item" onClick={() => handleNavigation('privacy')}>
              <span>Privacy</span>
              <span className="chevron">›</span>
            </li>
          </ul>
        </div>

        {/* Support & About Section */}
        <div className="settings-section">
          <h2 className="section-title">Support & About</h2>
          <ul className="settings-list">
            <li className="settings-item" onClick={() => handleNavigation('help')}>
              <span>Help & Support</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item" onClick={() => handleNavigation('terms')}>
              <span>Terms and Policies</span>
              <span className="chevron">›</span>
            </li>
          </ul>
        </div>

        {/* Actions Section */}
        <div className="settings-section">
          <h2 className="section-title">Actions</h2>
          <ul className="settings-list">
            <li className="settings-item" onClick={() => handleNavigation('report')}>
              <span>Report a problem</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item" onClick={() => handleNavigation('add-account')}>
              <span>Add account</span>
              <span className="chevron">›</span>
            </li>
            <li className="settings-item logout" onClick={() => handleNavigation('logout')}>
              <span>Log out</span>
              <span className="chevron">›</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
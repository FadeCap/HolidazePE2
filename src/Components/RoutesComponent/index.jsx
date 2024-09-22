import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import AuthPage from '../../pages/AuthPage';
import ContactPage from '../../pages/ContactPage';
import HomePage from '../../pages/HomePage';
import ProfilePage from '../../pages/ProfilePage';
import SpecificVenuePage from '../../pages/SpecificVenuePage';

function RoutesComponent() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/venue/:id" element={<SpecificVenuePage />} />
          {/* Fallback route for 404 - Not Found */}
          <Route
            path="*"
            element={
              <div className="text-center mt-10 text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
        <Layout />
      </div>
    </Router>
  );
}

export default RoutesComponent;

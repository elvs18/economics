import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { TermsProvider } from './context/TermsContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DictionaryPage from './pages/DictionaryPage';
import AdminPage from './pages/AdminPage';
import AdminLoginModal from './components/admin/AdminLoginModal';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <TermsProvider>
          <AuthProvider>
            <ToastProvider>
              <HashRouter>
                <div className="app-layout">
                  <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
                  <div className="main-content-wrap">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <DictionaryPage
                            isQuizOpen={isQuizOpen}
                            setIsQuizOpen={setIsQuizOpen}
                          />
                        }
                      />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route
                        path="*"
                        element={
                          <DictionaryPage
                            isQuizOpen={isQuizOpen}
                            setIsQuizOpen={setIsQuizOpen}
                          />
                        }
                      />
                    </Routes>
                  </div>
                  <Footer />
                  <AdminLoginModal />
                </div>
              </HashRouter>
            </ToastProvider>
          </AuthProvider>
        </TermsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

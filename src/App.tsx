import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/data/context/AuthContext';
import ErrorBoundary from './shared/components/common/ErrorBoundary';
import LoadingSpinner from './shared/components/common/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
const LoginRegisterContainer = lazy(() => import('./features/auth/ui/pages/LoginRegisterContainer').then(m => ({ default: m.default })));
const RegisterPage = lazy(() => import('./features/auth/ui/pages/RegisterPage').then(m => ({ default: m.default })));
const MainDashboard = lazy(() => import('./features/dashboard/ui/pages/MainDashboard').then(m => ({ default: m.default })));
const AdminDashboard = lazy(() => import('./features/dashboard/ui/pages/AdminDashboard').then(m => ({ default: m.default })));
const HomePage = lazy(() => import('./features/landing/ui/pages/HomePage'));
const LearnPage = lazy(() => import('./features/landing/ui/pages/HomePage'));
const AgeCoursesPage = lazy(() => import('./features/courses/ui/pages/AgeCoursesPage'));
const WelcomePage = lazy(() => import('./features/landing/ui/pages/HomePage'));
const ProfilePage = lazy(() => import('./features/profile/ui/pages/ProfilePage'));
const EditProfilePage = lazy(() => import('./features/profile/ui/pages/EditProfilePage'));
const CoursesPage = lazy(() => import('./features/courses/ui/pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('./features/courses/ui/pages/CourseDetailsPage'));
const MemoriesPage = lazy(() => import('./features/memories/ui/pages/MemoriesPage'));
const FlashcardsPage = lazy(() => import('./features/flashcards/ui/pages/FlashcardsPage'));
const FlashcardStudy = lazy(() => import('./features/flashcards/ui/pages/FlashcardStudy'));
const FlashcardsCardsPage = lazy(() => import('./features/flashcards/ui/pages/FlashcardsCardsPage'));
const InteractiveTasksPage = lazy(() => import('./features/courses/ui/pages/InteractiveTasksPage'));
const QuizPage = lazy(() => import('./shared/components/forms/QuizPage'));
const CourseEditor = lazy(() => import('./features/courses/ui/pages/CourseEditor'));
const InteractiveTasks = lazy(() => import('./shared/components/forms/InteractiveTasks'));
const Tests = lazy(() => import('./shared/components/forms/Tests'));
const QuizzesPage = lazy(() => import('./shared/components/forms/QuizzesPage'));
const MatchingPage = lazy(() => import('./shared/components/forms/Matching'));
const CertificateDemoPage = lazy(() => import('./features/certificates/ui/pages/CertificateDemoPage'));
const CertificatePage = lazy(() => import('./features/certificates/ui/pages/CertificatePage'));
const CourseLearningPage = lazy(() => import('./features/courses/ui/pages/CourseLearningPage'));
interface LazyComponentProps {
  component: React.ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

const LazyComponent = ({ component: Component, ...props }: LazyComponentProps) => (
  <Suspense fallback={<LoadingSpinner />}>
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  </Suspense>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, userRole, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
  if (adminOnly && userRole !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
function AppContent(): React.ReactElement {
  const { isAuthenticated, userRole, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          !isAuthenticated ? 
            <LazyComponent component={LoginRegisterContainer} /> : 
            <Navigate to={userRole === 'ADMIN' ? '/admindashboard' : '/dashboard'} replace />
        } />
        
        <Route path="/register" element={
          !isAuthenticated ? 
            <LazyComponent component={RegisterPage} /> : 
            <Navigate to={userRole === 'ADMIN' ? '/admindashboard' : '/dashboard'} replace />
        } />
        
        {/* Admin routes */}
        <Route path="/admindashboard/*" element={
          <ProtectedRoute adminOnly>
            <LazyComponent component={AdminDashboard} />
          </ProtectedRoute>
        }>
          <Route path="courseeditor" element={<LazyComponent component={CourseEditor} />} />
          <Route path="courseeditor/:courseId" element={<LazyComponent component={CourseEditor} />} />
          <Route path="course/:id" element={<LazyComponent component={CourseDetailsPage} />} />
        </Route>
        
        {/* Course Learning Route */}
        <Route path="/learn/course/:id" element={
          <ProtectedRoute>
            <LazyComponent component={CourseLearningPage} />
          </ProtectedRoute>
        } />
        {/* User routes */}
        <Route path="/" element={
          <ProtectedRoute>
            {userRole === 'ADMIN' ? 
              <Navigate to="/admindashboard" replace /> : 
              <LazyComponent component={HomePage} />
            }
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {userRole === 'ADMIN' ? 
              <Navigate to="/admindashboard" replace /> : 
              <LazyComponent component={MainDashboard} />
            }
          </ProtectedRoute>
        } />
        
        {/* Common protected routes */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <LazyComponent component={CoursesPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <LazyComponent component={CourseDetailsPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/welcome" element={
          <ProtectedRoute>
            <LazyComponent component={WelcomePage} />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <LazyComponent component={ProfilePage} />
          </ProtectedRoute>
        } />
        
        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <LazyComponent component={EditProfilePage} />
          </ProtectedRoute>
        } />
        
        <Route path="/learn" element={
          <ProtectedRoute>
            <LazyComponent component={LearnPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/learn/:group" element={
          <ProtectedRoute>
            <LazyComponent component={AgeCoursesPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/memories" element={
          <ProtectedRoute>
            <LazyComponent component={MemoriesPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/flashcards" element={
          <ProtectedRoute>
            <LazyComponent component={FlashcardsPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/flashcards/study/:setId" element={
          <ProtectedRoute>
            <LazyComponent component={FlashcardStudy} />
          </ProtectedRoute>
        } />
        
        <Route path="/flashcards/:setId" element={
          <ProtectedRoute>
            <LazyComponent component={FlashcardsCardsPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/interactive-tasks" element={
          <ProtectedRoute>
            <LazyComponent component={InteractiveTasksPage} />
          </ProtectedRoute>
        } />
        
        {/* Quiz and interactive routes */}
        <Route path="/quiz/:quizId" element={
          <ProtectedRoute>
            <LazyComponent component={QuizPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/interactive" element={
          <ProtectedRoute>
            <LazyComponent component={InteractiveTasks} />
          </ProtectedRoute>
        } />
        
        <Route path="/interactive/tests" element={
          <ProtectedRoute>
            <LazyComponent component={Tests} />
          </ProtectedRoute>
        } />
        
        <Route path="/interactive/quizzes" element={
          <ProtectedRoute>
            <LazyComponent component={QuizzesPage} />
          </ProtectedRoute>
        } />
        
        <Route path="/interactive/matching" element={
          <ProtectedRoute>
            <LazyComponent component={MatchingPage} />
          </ProtectedRoute>
        } />
        
        {/* Public certificate routes */}
        <Route path="/certificate" element={
          <LazyComponent component={CertificatePage} />
        } />
        
        <Route path="/certificate-demo" element={
          <LazyComponent component={CertificateDemoPage} />
        } />
        
        {/* Catch all - redirect to appropriate dashboard */}
        <Route path="*" element={
          <Navigate to={isAuthenticated ? 
            (userRole === 'ADMIN' ? '/admindashboard' : '/dashboard') : 
            '/login'} replace />
        } />
      </Routes>
    </ErrorBoundary>
  );
}
function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AppContent />
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

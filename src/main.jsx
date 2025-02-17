import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import store from './redux/store';    
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import VideoGrid from './components/VideoGrid.jsx';
import VideoView from './components/VideoView.jsx';
import NotFound from './components/NotFound.jsx';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <VideoGrid />
      },
      {
        path: '/watch/:_id',
        element: <VideoView />
      }
    ],
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* ✅ Wrap everything inside Redux Provider */}
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);

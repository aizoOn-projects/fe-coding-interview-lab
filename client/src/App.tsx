import './App.css';
import LoginPage from './pages/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './components/theme-provider';

// Create a router
const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage />
	},
	{
		path: '/app',
		element: (
			<RequireAuth>
				<HomePage />
			</RequireAuth>
		)
	}
]);

const App = () => {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='h-full'>
				<RouterProvider router={router} />
			</div>
		</ThemeProvider>
	);
};

export default App;

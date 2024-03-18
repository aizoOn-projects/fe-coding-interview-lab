import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const navigate = useNavigate();

	const handleLogin = async () => {
		setIsLoggingIn(true);
		setLoginError('');
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			// Handle login success

			setIsLoggingIn(false);
			localStorage.setItem('isAuthenticated', 'true');
			navigate('/app');
		} catch (error) {
			setIsLoggingIn(false);
			setLoginError('Login failed. Please try again.');
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}
		>
			<Card>
				<div style={{ padding: '2rem' }}>
					<div style={{ marginBottom: '1rem' }}>
						<Input
							// fullWidth
							placeholder='Username'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div style={{ marginBottom: '2rem' }}>
						<Input
							// fullWidth
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{loginError && <p style={{ color: 'red' }}>{loginError}</p>}
					<Button fullWidth variant='filled' onClick={handleLogin} disabled={isLoggingIn}>
						{isLoggingIn ? 'Logging in...' : 'Login'}
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default LoginPage;

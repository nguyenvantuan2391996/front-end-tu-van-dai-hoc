import React from 'react'
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import UserPage from './pages/UserPage/UserPage';
import AdminPage from './pages/AdminPage/AdminPage';
import CommentPage from './pages/CommentPage/CommentPage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';

const routes = [
	{
		path : '/',
		exact : true,
		main: () => <LoginPage />
	},
	{
		path : '/user',
		exact : true,
		main: () => <UserPage />
	},
	{
		path : '/admin',
		exact : true,
		main: () => <AdminPage />
	},
	{
		path : '/comment',
		exact : true,
		main: () => <CommentPage />
	},
	{
		path : '/feedback',
		exact : true,
		main: () => <FeedbackPage />
	},
	{
		path : '',
		exact : false,
		main: () => <NotFoundPage />
	}
];

export default routes;
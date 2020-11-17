import React from 'react'
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import UserPage from './pages/UserPage/UserPage';
import AdminPage from './pages/AdminPage/AdminPage';
import MessagePage from './pages/MessagePage/MessagePage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';
import ToolQueryPage from './pages/ToolQueryPage/ToolQueryPage';

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
		path : '/message',
		exact : true,
		main: () => <MessagePage />
	},
	{
		path : '/feedback',
		exact : true,
		main: () => <FeedbackPage />
	},
	{
		path : '/query',
		exact : true,
		main: () => <ToolQueryPage />
	},
	{
		path : '',
		exact : false,
		main: () => <NotFoundPage />
	}
];

export default routes;
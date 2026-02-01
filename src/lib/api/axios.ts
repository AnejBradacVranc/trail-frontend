import axios from 'axios';

//const endpoint = process.env.BE_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	validateStatus: () => true
});

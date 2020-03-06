import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://essentialism.teagueteam.now.sh/api',
        headers: {
            Authorization: token
        }
    });
};

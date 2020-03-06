import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://git.heroku.com/essentialism-test.git/api',
        headers: {
            Authorization: token
        }
    });
};

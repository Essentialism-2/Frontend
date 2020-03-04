import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const TopThree = () => {
    const [ topThreeValues, setTopThreeVaues ] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get(`https://buildweek-essentialism.herokuapp.com/api/values/user/2`)
        .then(res => {
            console.log(res.data.filter(item => item.Top_Three === true))
            // console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])


    return (
        <h1>Top Three Values</h1>
        
    )
}

export default TopThree;
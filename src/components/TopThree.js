import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// M-UI CARD
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    padding: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  valueRemoveContainer: {
      display: 'flex',
      justifyContent: 'flex-end'
  },
});

const TopThree = () => {
    const classes = useStyles();

    const [ topThreeValues, setTopThreeValues ] = useState([]);
    const [ loading, setLoading ] = useState(false)
    const [ listOfValues, setListOfValues ] = useState([])

    if(topThreeValues.length < 3) {
        setTopThreeValues(
           [ ...topThreeValues,
                {addValue: true}
            ]

        )
    }

    useEffect(() => {
        axiosWithAuth()
        .get('https://buildweek-essentialism.herokuapp.com/api/values/')
        .then(res => {
            console.log('all values', res)
            setListOfValues(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        // setListOfValues()
    },[])

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`https://buildweek-essentialism.herokuapp.com/api/values/user/2`)
        .then(res => {
            console.log('your top three values', res.data.filter(item => item.Top_Three === true))
            setTopThreeValues(res.data.filter(item => item.Top_Three === true))
            console.log('all your values', res.data)
            setLoading(false)

        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[])

    const changeTopThree = (valueId) => {
        console.log(valueId)
        let send = {
            value_id: valueId,
            top_three: false
        }
        setLoading(true)
        axiosWithAuth()
        .delete(`https://buildweek-essentialism.herokuapp.com/api/values/delete/${valueId}`)
        .then(res => {
            console.log(res)
            axiosWithAuth()

            .get(`https://buildweek-essentialism.herokuapp.com/api/values/user/2`)
            .then(res => {
                console.log(res.data.filter(item => item.Top_Three === true))
                setTopThreeValues(res.data.filter(item => item.Top_Three === true))
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        })
        .catch( err => {
            console.log(err)
            setLoading(false)
        })
    }




    return (
        <div>
            <h1>Your Top 3 Values</h1>
            {loading && 'is loading...'}
            <div className={classes.container}>
                {topThreeValues.map(item => 
                    <Card key={item.Value_Id} className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {item.Value_name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        
                        </Typography>
                        <Typography variant="body2" component="p">
                        {item.Value_description}
                        </Typography>
                    </CardContent>
                    {!item.addValue ?
                    <CardActions className={classes.valueRemoveContainer}>
                        
                        <Fab onClick={() => changeTopThree(item.Value_Id)} color="secondary" aria-label="add">
                            <HighlightOffIcon   />
                        </Fab>
                    </CardActions>
                    :
                    <ul>
                        {listOfValues.map(item => <li>{item.name}</li>)}
                    </ul>
                    }
                    </Card>

                    // :
                    //     <p>some other stuff</p>

                    )}
                
            </div>
        </div>

    )
}

export default TopThree;
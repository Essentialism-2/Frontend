import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
  },
  title: {
    width: '100%',
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
});

const ProjectsForm = () => {
    const classes = useStyles();
    const [projects, setProjects ] = useState([]);


    useEffect(() => {
        axiosWithAuth()
        .get('/projects')
        .then(res => {
            console.log('all projects', res)
            setProjects(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return (
        <div>
            <h1 >Projects</h1>
            <div className={classes.container}>
                {projects.map(project => 
                    <Card key={project.id} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {project.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default ProjectsForm

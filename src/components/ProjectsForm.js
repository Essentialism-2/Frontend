import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
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
  addProject: {
      position: 'absolute',
      bottom: 20,
      right: 20
  },
  paper: {
    position: 'absolute',
    width: '75%',
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: '3px 3px #ccc',
    padding: 15,
  },
  projectForm: {
      display: 'flex',
      justifyContent: 'space-around',
  }
});

const ProjectsForm = () => {
    const classes = useStyles();
    const [projects, setProjects ] = useState([]);
    const [newProject, setNewProject] = useState({})
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setNewProject(
            {...newProject, 
            [e.target.name]: e.target.value}
        )
    }

    const getAllProjects = () => {
        axiosWithAuth()
        .get('/projects')
        .then(res => {
            console.log('all projects', res)
            setProjects(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

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

    const addProject = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/projects', newProject)
        .then(res => {
            handleClose();
            getAllProjects();
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }

    return (
        <div>
            <h1 >Projects</h1>
            <div className={classes.container}>
                {projects.map(project => 
                    <Card key={project.id} className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        project:
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {project.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        description:
                        </Typography>
                        <Typography variant="body2" component="p">
                        {project.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>
                )}
            </div>


            <Fab onClick={handleOpen} className={classes.addProject}  color="primary" aria-label="add">
                <AddIcon  />
            </Fab>
            <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Add Project</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                <form onSubmit={addProject} className={classes.projectForm} noValidate autoComplete="off">
                    <TextField onChange={handleChange} name='name' id="name" label="Name" />
                    <TextField onChange={handleChange} name='description' id="description" label="Description" />
                    <Button type='submit' >Add</Button>
                </form>
                </div>
            </Modal>
            </div>

        </div>
    )
}

export default ProjectsForm

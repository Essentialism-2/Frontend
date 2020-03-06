import React, { useState, useEffect } from 'react';
//Styling
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Fab,
    Modal,
    TextField
} from '@material-ui/core';
import { AddIcon } from '@material-ui/icons/Add';
import { SettingsIcon } from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        maxWidth: 400,
        margin: 10,
        position: 'relative'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexFlow: 'row wrap'
    },
    title: {
        width: '100%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    addProject: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        }
    },
    paper: {
        position: 'absolute',
        width: '75%',
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: '3px 3px #ccc',
        padding: 15
    },
    projectForm: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    bottomRightRelative: {
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    bottomLeftFixed: {
        position: 'fixed',
        bottom: 10,
        left: 10,
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        }
    },
    button: {
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        }
    }
}));

const ProjectsForm = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({});
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = useState(false);

    const handleEditing = () => {
        setEditing(!editing);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const getAllProjects = () => {
        axiosWithAuth()
            .get('/projects')
            .then(res => {
                console.log('all projects', res);
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        axiosWithAuth()
            .get('/projects')
            .then(res => {
                console.log('all projects', res);
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addProject = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/projects', newProject)
            .then(res => {
                handleClose();
                getAllProjects();
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteProject = project => {
        let deleteThis = { project_id: project };
        axiosWithAuth()
            .delete('/projects', { data: deleteThis })
            .then(res => {
                console.log(res);
                getAllProjects();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Projects</h1>
            <div className={classes.container}>
                {projects.map(project => (
                    <Card
                        key={project.id}
                        className={classes.root}
                        variant='outlined'>
                        <CardContent>
                            <Typography
                                className={classes.title}
                                color='textSecondary'
                                gutterBottom>
                                project:
                            </Typography>
                            <Typography variant='h5' component='h2'>
                                {project.name}
                            </Typography>
                            <Typography
                                className={classes.pos}
                                color='textSecondary'>
                                description:
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {project.description}
                            </Typography>
                        </CardContent>
                        <ul>
                            {project.values.map(value => (
                                <li key={`${project.id} ${value.values_id}`}>
                                    {value.values_id}
                                </li>
                            ))}
                        </ul>
                        <CardActions>
                            {editing && (
                                <Button
                                    onClick={() => deleteProject(project.id)}
                                    className={classes.bottomRightRelative}
                                    variant='contained'
                                    color='secondary'>
                                    Delete Project
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Fab
                onClick={handleOpen}
                className={classes.addProject}
                color='primary'
                aria-label='add'>
                <AddIcon className={classes.button} />
            </Fab>
            <div></div>
            <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={open}
                onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    <h2 id='simple-modal-title'>Add Project</h2>
                    <p id='simple-modal-description'>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </p>
                    <form
                        onSubmit={addProject}
                        className={classes.projectForm}
                        noValidate
                        autoComplete='off'>
                        <TextField
                            onChange={handleChange}
                            name='name'
                            id='name'
                            label='Name'
                        />
                        <TextField
                            onChange={handleChange}
                            name='description'
                            id='description'
                            label='Description'
                        />
                        <Button type='submit'>Add</Button>
                    </form>
                </div>
            </Modal>

            <Fab
                onClick={handleEditing}
                className={classes.bottomLeftFixed}
                color='primary'
                aria-label='add'>
                <SettingsIcon className={classes.button} />
            </Fab>
        </div>
    );
};

export default ProjectsForm;

import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import '../App.css';
import { ClipLoader } from 'react-spinners';

import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';



import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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
    position: 'relative',
    paddingBottom: 25,
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
      position: 'fixed',
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
  },
  bottomRightRelative: {
      position: 'absolute',
      bottom: 5,
      right: 5,
  },
  bottomLeftFixed: {
      position: 'fixed',
      bottom: 10,
      left: 10
  },
  shape: {
    backgroundColor: 'blue',
    width: 70,
    height: 70,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
  matchesTopThree: {
      color: 'green',
      fontWeight: 800
  }
});

const ProjectsForm = (props) => {
    const classes = useStyles();
    const [projects, setProjects ] = useState([]);
    const [newProject, setNewProject] = useState({})
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [listOfValues, setListOfValues] = useState([]);
    const [newValue, setNewValue] = useState({});
    const [loading, setLoading] = useState(false);
    const [topThreeValues, setTopThreeValues] = useState([]);

    const rectangle = <div className={classes.shape} />;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    useEffect(() => {
        setLoading(true);
        axiosWithAuth()
            .get(
                `/values/user/1`
            )
            .then(res => {
                console.log(
                    'your top three values',
                    res.data.filter(item => item.Top_Three === true)
                );
                setTopThreeValues(
                    res.data.filter(item => item.Top_Three === true)
                );
                console.log('all your values', res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);



    const handleChangeProjectValue = event => {
        setNewValue(event.target.value);
        console.log('new value set', event.target.value);
    };

    useEffect(() => {
        axiosWithAuth()
            .get('/values/')
            .then(res => {
                console.log('all values', res);
                setListOfValues(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        // setListOfValues()
    }, []);

    // const handleEditing = () => {
    //     setEditing(!editing)
    // }

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
            // console.log('all projects', res)
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

      const deleteProject = (project) => {
        let deleteThis = {project_id: project};
        axiosWithAuth()
            .delete('/projects', {data: deleteThis})
            .then(res => {
                console.log(res)
                // props.handleEditing();
                getAllProjects();
            })
            .catch(err => {
                console.log(err)
            })
      }

      const addValueToProject = (projectId) => {
        setLoading(true);
        
        axiosWithAuth()
            .post(
                `/projects/value`,
                {values_id: newValue, project_id: projectId}
            )
            .then(res => {
                console.log(res);
                setOpen(false);
                getAllProjects();
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };


    const removeValueFromProject = (project, value) => {
        alert(`project: ${project}, value: ${value}`);
        axiosWithAuth()
        .delete('/projects/value', {data: {project_id: project, values_id: value}})
        .then(res => {
            // console.log(res)
            getAllProjects()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const trashIconButton = (project, value) => {
        return (
        <IconButton onClick={() => removeValueFromProject(project, value)} aria-label="delete" className={classes.margin}>
        <DeleteIcon fontSize="small" />
        </IconButton>
        )
    }

    return (
        <div>
            <h1 >Projects</h1>
            <div className={classes.container}>
                {projects.map(project => 
                    
                        <Badge key={`${project.id} key`} color="secondary" badgeContent={project.projectValues.filter(value => value.matchesTopThree === true).length}>
                    <Card key={project.id} className={classes.root} variant="outlined">
                            
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        project:
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {project.name}
                        </Typography>
                        <Typography variant="h5" component="h2">

                        {/* how many match: {project.values.filter(value =>  value.values_id === topThreeValues[0].Value_Id || value.values_id === topThreeValues[1].Value_Id || value.values_id === topThreeValues[2].Value_Id).length} */}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        description:
                        </Typography>
                        <Typography variant="body2" component="p">
                        {project.description}
                        </Typography>
                    </CardContent>
                    {!loading ?
                    <>
                        <Typography variant="body2" component="p">
                            <h4>Values for project:</h4>
                            {props.editing ? 
                            project.projectValues.map(value => value.matchesTopThree ? <div className={classes.matchesTopThree}  key={`${project.id} ${value.values_id}`}> {value.name} {trashIconButton(project.id, value.id)}</div>: <div key={`${project.id} ${value.values_id}`}> {value.name} {trashIconButton(project.id, value.id)}</div>)
                            :
                            project.projectValues.map(value => value.matchesTopThree ? <div className={classes.matchesTopThree}  key={`${project.id} ${value.values_id}`}> {value.name}</div>: <div key={`${project.id} ${value.values_id}`}> {value.name}</div>)
                            }
                        
                        </Typography>
                        <Typography variant="body2" component="p">
                        <form
                                                    className={
                                                        classes.container
                                                    }>
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }>
                                                        <InputLabel htmlFor='demo-dialog-native'>
                                                            New Value
                                                        </InputLabel>
                                                        <Select
                                                            native
                                                            value={
                                                                newValue.value_id
                                                            }
                                                            onChange={
                                                                handleChangeProjectValue
                                                            }
                                                            input={
                                                                <Input id='demo-dialog-native' />
                                                            }>
                                                            <option value='' />
                                                            {listOfValues.map(
                                                                item => (
                                                                    <option key={item.id}
                                                                    value={
                                                                        item.id
                                                                    }>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </option>
                                                                )
                                                                )}
                                                        </Select>
                                                    </FormControl>
                                                </form>
                        </Typography>
                        



                    <CardActions>
                        {props.editing ? 
                            <Button onClick={() => deleteProject(project.id)} className={classes.bottomRightRelative} variant="contained" color="secondary">
                                Delete Project
                            </Button>
                        :
                        <Button onClick={() => addValueToProject(project.id)} className={classes.bottomRightRelative} variant="contained" color="primary">
                                Add Value
                            </Button>
                        }
                    </CardActions>
                    </>
                                            :
                                            <ClipLoader
                                            //   css={override}
                                            size={150}
                                            //size={"150px"} this also works
                                            color={'#123abc'}
                                            loading={loading}
                                            />
                                        }
                    </Card>
                                        </Badge>
                )}
            </div>


            <Fab onClick={handleOpen} className={classes.addProject}  color="primary" aria-label="add">
                <AddIcon  />
            </Fab>
            <div>
            </div>
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
                    <Button color="primary"  variant="contained" type='submit' >Add</Button>
                </form>
                </div>
            </Modal>

            {/* <Button className={classes.bottomLeftFixed}>#</Button> */}
            {/* <Fab onClick={handleEditing} className={classes.bottomLeftFixed}  color="primary" aria-label="add">
                <SettingsIcon />
            </Fab> */}


        </div>
    )
}



export default ProjectsForm

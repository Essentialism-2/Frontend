import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
//Styling
import { makeStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Paper,
    Typography
} from '@material-ui/core';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';
//Context
import { DescriptionContext, RightContext } from '../utils/store';
//Components
import ValuesList from './ValuesList';
import CuratedValues from './CuratedValues';
import FinalValues from './FinalValues';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        },
        color: 'white'
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    },
    resetContainer: {
        padding: theme.spacing(3)
    }
}));

function getSteps() {
    return [
        'Select Values - What is important to you?',
        'Refine values - Pick your top 3',
        'Think about your values - Describe why these are important to you'
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <ValuesList />;
        case 1:
            return <CuratedValues />;
        case 2:
            return <FinalValues />;

        default:
            return 'Unknown step';
    }
}

const ValuesForm = () => {
    const [right] = useContext(RightContext);
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [description] = useContext(DescriptionContext);
    const steps = getSteps();
    const userId = localStorage.getItem('id');

    const assignValues = () => {
        right.map(item => {
            axiosWithAuth()
                .post(`/values/user/${userId}`, {
                    value_id: item.id
                })
                .then(res => {
                    console.log('POST response', res);
                })
                .catch(err => {
                    console.log('POST error', err);
                });
        });
    };

    const setTopThree = () => {
        right.map(item => {
            console.log('Item', item);
            axiosWithAuth()
                .put(`/values/user/${userId}`, {
                    value_id: item.Value_Id,
                    top_three: true
                })
                .then(res => {
                    console.log('PUT response', res);
                })
                .catch(err => console.log('PUT error', err));
        });
    };

    const sendDescription = () => {
        right.map(item => {
            axiosWithAuth()
                .put(`/values/user/${userId}`, {
                    value_id: item.Value_Id,
                    description: description.Value_description
                })
                .then(res => console.log('Description PUT response', res))
                .catch(err => console.log('Description PUT error', err));
        });
    };

    const handleNext = () => {
        if (activeStep === 0) {
            assignValues(right);
        } else if (activeStep === 1) {
            setTopThree(right);
        } else {
            sendDescription(right);
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography component='span'>
                                {getStepContent(index)}
                            </Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}>
                                        Back
                                    </Button>
                                    <Button
                                        variant='contained'
                                        onClick={handleNext}
                                        className={classes.button}>
                                        {activeStep === steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <Button className={classes.button} variant='contained'>
                            Dashboard
                        </Button>
                    </Link>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
};

export default ValuesForm;

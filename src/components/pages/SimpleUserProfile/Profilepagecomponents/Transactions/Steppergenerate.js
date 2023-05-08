import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Friendslist from './Friendslist';
import { Divider } from '@mui/material';
import Qrgeneration from './Qrgeneration';
import Scanqrcode from './Scanqrcode';



export default function Steppergenerate(props) {
  const [matchdata, setMatchdata] = React.useState();
  const steps = [
    { label: 'Select your match', component: <Friendslist match={setMatchdata}/> },
    { label: 'generate qr code for your match to scan ', component: <Qrgeneration data={matchdata} post={props.post}/> },
    // { label: 'Scan the qr code ', component: <Scanqrcode/> }
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{pb:"3rem",pt:"2rem"}} >
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Divider/>
      {activeStep === steps.length ? (
        <Box sx={{position: "relative", top: 0 }} >
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Box>
      ) : (
        <Box  >
             <Box height={"100%"} >   {steps[activeStep].component} </Box>
       
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

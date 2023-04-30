import { useDispatch, useSelector } from "react-redux";


import { Alert, Button } from "@mui/material";
import { accVerificationSendTokenAction } from "../../../../ReduxB/slices/accountVerification/accVerificationSlices";

export default function AccountVerificationAlertWarning() {
  const dispatch = useDispatch();
  return (  

<Alert severity="warning"
        action={
          <Button color="inherit" size="small"
          onClick={() => dispatch(accVerificationSendTokenAction())}
          >
         
            Verify 
          </Button>
        }
      >
       Not verified yet ?
      </Alert>
  );
}

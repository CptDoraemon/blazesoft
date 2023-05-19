import React from "react";
import {DialogActions} from "@mui/material";
import MuiButton from "@mui/material/Button";
import {ButtonProps} from "@mui/material/Button/Button";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const Button = styled(MuiButton)(({ theme }) => ({
  minWidth: 120
}))

interface DualButtonDialogActionsProps {
  handleSubmit?: () => void,
  handleCancel?: () => void,
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
}

const DualButtonDialogActions = ({handleSubmit, handleCancel, submitButtonProps, cancelButtonProps}: DualButtonDialogActionsProps) => {
  return (
    <DialogActions sx={{py: 2}}>
      <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
        <Grid item>
          <Button
            onClick={handleSubmit}
            variant={'contained'}
            disableElevation
            // eslint-disable-next-line react/no-children-prop
            children={'Submit'}
            {...submitButtonProps}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleCancel}
            variant={'outlined'}
            // eslint-disable-next-line react/no-children-prop
            children={'Cancel'}
            {...cancelButtonProps}
          />
        </Grid>
      </Grid>
    </DialogActions>
  )
};

export default DualButtonDialogActions
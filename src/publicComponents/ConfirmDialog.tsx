import React from "react";
import {styled} from "@mui/material/styles";
import {Dialog, DialogContent, DialogTitle as MuiDialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import DualButtonDialogActions from "@/publicComponents/DualButtonDialogActions";
import Divider from "@mui/material/Divider";

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  display: 'block'
}))

interface ConfirmDialogProps {
  title?: string,
  content: string | JSX.Element,
  onYes: () => void,
  onNo: () => void,
  open: boolean,
}

const ConfirmDialog = ({open, title, content, onYes, onNo}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => false}
      fullWidth
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {title ?? 'Warning'}
      </DialogTitle>
      <DialogContent>
        <Divider/>
        <Box my={8} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {content}
        </Box>
        <Divider/>
      </DialogContent>
      <DualButtonDialogActions
        handleCancel={onNo}
        handleSubmit={onYes}
        submitButtonProps={{
          variant: 'outlined',
          children: 'Yes',
        }}
        cancelButtonProps={{
          variant: 'contained',
          children: 'No',
        }}
      />
    </Dialog>
  )
};

export default ConfirmDialog
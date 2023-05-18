import React from "react";
import {styled} from "@mui/material/styles";

const Root = styled('div')(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const InnerWrapper = styled('div')(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.values.md
}));

interface WidthWrapperProps {
  children: JSX.Element | JSX.Element[] | string
}

const WidthWrapper = ({children}: WidthWrapperProps) => {

  return (
    <Root>
      <InnerWrapper>
        {children}
      </InnerWrapper>
    </Root>
  )
};

export default WidthWrapper

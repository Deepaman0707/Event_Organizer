import React from "react";
import Dialog from "@material-ui/core/Dialog";

// Pop-up
const Popup = ({ open, handleClose, componenet : Component }) => {
    return (
      // props received from App.js

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: 'none',
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <Component handleClose={handleClose} />
      </Dialog>
    )
  };

export default Popup;
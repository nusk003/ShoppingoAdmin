import React from 'react'
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CombinationValues from './CombinationValues';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide'

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class CombinationValuesDialog extends React.Component {

    render(){

        const {open,close} = this.props

        return(
            <Dialog 
                  open = {open} 
                  fullScreen
                  onClose = {close}
                  TransitionComponent = {Transition}
                >
                <AppBar style = {{position : 'relative'}} >
                  <Toolbar>
                    <IconButton color="inherit" onClick={close} aria-label="Close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style = {{flex : 1}} >
                      Combination Values
                    </Typography>
                    {/* <Button color="inherit" onClick={this.handleClose}>
                      save
                    </Button> */}
                  </Toolbar>
                </AppBar>
                  <CombinationValues/>
            </Dialog>
        )
    }
}

export default CombinationValuesDialog
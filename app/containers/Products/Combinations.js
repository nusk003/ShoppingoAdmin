import React from 'react'
import { FormGroup, TextField, Select, Menu, MenuItem, InputLabel, withStyles, Button, SwipeableDrawer, Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import Combination from './Combination';
import CombinationValues from './CombinationValues';
import CloseIcon from '@material-ui/icons/Close';
import CombinationValuesDialog from './CombinationValuesDialog';

const styles = theme => ({
    demo: {
      height: 'auto',
    },
    divider: {
      margin: `${theme.spacing.unit * 3}px 0`,
    },
    input: {
      margin: theme.spacing.unit * 3,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit * 3,
      marginTop : 0
    },
  });

class Combinations extends React.Component{

    state = {
      openCombinationValues : false
    }

    closeCombinationValues = () => {

      this.setState({openCombinationValues : false})
    }

    openCobinationValues = () => {

      this.setState({openCombinationValues : true})

    }

    render(){

        const {classes} = this.props
        const {openCombinationValues} = this.state

        return(
            <div>
                <CombinationValuesDialog 
                  open = {openCombinationValues} 
                  close = {this.closeCombinationValues} 
                />
                <div style = {{display : 'flex',flexDirection : 'row'}} >
                <div>
                <FormGroup className = {classes.formControl} >
                    <InputLabel htmlFor = "combination" >Select Combination</InputLabel>
                    <Select
                        title = "Combination"
                        placeholder = "Combination"
                        inputProps={{
                            name: 'combination',
                            id: 'combination'
                        }}
                    >
                        <MenuItem>Hello</MenuItem>
                    </Select>
                </FormGroup>
                <Combination/>
                </div>
                <div>
                <Button onClick = {this.openCobinationValues} >
                  Manage Combination Values
                </Button>
                <Button onClick = {this.openCobinationValues} >
                  Manage Combination Values
                </Button>
                </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Combinations)
import React from 'react'
import { FormGroup, TextField, Select, Menu, MenuItem, InputLabel, withStyles } from '@material-ui/core';
import Combination from './Combination';

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

    render(){

        const {classes} = this.props

        return(
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
        )
    }
}

export default withStyles(styles)(Combinations)
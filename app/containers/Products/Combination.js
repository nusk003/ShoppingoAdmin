import React from 'react'
import { FormGroup, InputLabel, Input, Select, MenuItem, FormControlLabel, Switch, Button, withStyles, Checkbox, FormHelperText, Grid } from '@material-ui/core';

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

class Combination extends React.Component {

    render(){

        const {classes} = this.props

        return (
            <Grid>
                <FormGroup className = {classes.formControl} >
                    <InputLabel>Unit</InputLabel>
                    <Select>
                        <MenuItem>Kg</MenuItem>
                    </Select>
                </FormGroup>
                <FormGroup className = {classes.formControl} >
                    <InputLabel>Standard Unit</InputLabel>
                    <Input placeholder = "Unit" />
                </FormGroup>
                <FormGroup className = {classes.formControl} >
                    {/* <InputLabel>MRP</InputLabel> */}
                    <Input placeholder = "MRP" />
                    <FormControlLabel
                        control={(
                            <Checkbox
                            checked={true}
                            onChange={{}}
                            value="checkedA"
                            />
                        )}
                        label="Change all prices according to standard unit"
                    />
                    <FormHelperText style = {{color : 'red'}} >Note: Please enter the One standard unit price here</FormHelperText>
                </FormGroup>
                <FormGroup className = {classes.formControl} >
                    <FormControlLabel
                        control={(
                            <Switch
                            checked={true}
                            onChange={{}}
                            value={true}
                            />
                        )}
                        label="Delete"
                        // className={classes.formControl}
                    />
                </FormGroup>
                <FormGroup className = {classes.formControl} >
                <Button variant = "contained" color = "primary" >
                    Update
                </Button>
                </FormGroup>
            </Grid>
        )
    }
}

export default withStyles(styles)(Combination)
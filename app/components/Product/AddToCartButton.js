import React from 'react'
import { Fab, Icon, FormControl, Input, Button } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import { withStyles } from '@material-ui/core/styles';
import styles from '../CardPaper/cardStyle-jss';

class AddToCartButton extends React.Component {

    render(){
        const {qty,onAddToCart,onPlus,onMinus,iconOnly,onChange,classes,list} = this.props
        return(
            qty !== 0 ?
            <div style = {{backgroundColor : 'white',borderRadius : '5vw',alignItems : 'center',display : 'flex',flexDirection : 'row'}} className = {list ? classes.buttonAddList : classes.buttonAdd }>
                  <Fab onClick = {onMinus}  size = "small" color = "secondary" >
                    <Icon>expand_more</Icon>
                  </Fab>
                  <FormControl>
                    <Input
                      placeholder = "Quantity"
                      title = "Quantity"
                      id = "qty-input"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange = {(e)=>{
                        if(e.target.value > 0) {
                            onChange(Math.floor(e.target.value))
                        }
                      }}
                      style = {{textAlign : 'center',width : 75,marginRight : '1vw',marginLeft : '1vw'}}
                      inputProps={{ inputProps: { min: 1 },style : {textAlign : 'center'}}}
                      value={qty}
                      // className={classes.quantity}
                    //   onChange={this.handleQtyChange}
                    />
                  </FormControl>
                  <Fab onClick = {onPlus} size = "small" color = "secondary" >
                    <Icon>expand_less</Icon>
                  </Fab>
            </div> 
            :
            <Button
                variant="contained"
                onClick={onAddToCart}
                color="secondary"
                className = {list ? classes.buttonAddList : classes.buttonAdd} 
            >
            <AddShoppingCart/>
            {list &&
            `Add to cart`
            }
            
            </Button>
        
        )
    }
}

export default withStyles(styles)(AddToCartButton)
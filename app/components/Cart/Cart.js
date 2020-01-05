import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Type from 'dan-styles/Typography.scss';
import styles from './cart-jss';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'
import AddToCartButton from '../Product/AddToCartButton';
import { Modal } from '@material-ui/core';
import {withRouter} from 'react-router-dom'

class Cart extends React.Component {

  
  render() {
    const {
      classes,
      anchorEl,
      close,
      dataCart,
      removeItem,
      checkout,
      products,
      
    } = this.props;

    let totalPrice = 0

    for (let {product,qty,weight} of products) {
      
      totalPrice += qty*product.defaultCombination.sellPrice * (product.weightEnabled ? weight : 1)

    }

    const getCartItem = dataArray => dataArray.map((cartItem, index) => {
      const {product,qty,weight} = cartItem
      return(
      <Fragment key={index.toString()}>
        <ListItem>
          <figure style = {{width : 50,height : 50}} >
            <img src={product.images[0]} alt="thumb" />
          </figure>
          <ListItemText
            primary={`${product.title} ${product.weightEnabled ? weight : ''} ${product.defaultCombination && product.defaultCombination.value }`}
            secondary={
              <div>
              <p>
              {`x${qty} Rs.${parseFloat(product.defaultCombination.sellPrice) * (product.weightEnabled ? weight : 1)}`}</p>
              <AddToCartButton 
                list
                qty = {qty} 
                onAddToCart = {()=>this.props.addToCart({product:{...product,...{}},qty,weight})} 
                onPlus = {()=>this.props.updateCart(index,{...cartItem,...{qty:parseInt(qty) + 1}})}
                onMinus = {()=>{
                  qty===1 ? this.props.removeCart(index)
                  :
                  this.props.updateCart(index,{...cartItem,...{qty : parseInt(qty) - 1}})
                }}
                onChange = {(qty)=>this.props.updateCart(index,{...cartItem,...{qty}})}
              />
              </div>
            }
            className={classes.itemText}
          />
          
          
          <ListItemSecondaryAction>
            <IconButton aria-label="Comments" onClick={() => this.props.removeCart(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <li>
          <Divider />
        </li>
      </Fragment>)}
    );
    return (
      <Menu
        id="cart-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={close}
        className={classes.cartPanel}
      >

        <List
          component="ul"
          subheader={(
            <ListSubheader component="div">
              <ShoppingCartIcon />
              Total:&nbsp;
              {products.length}
              &nbsp;Unique items in Cart
            </ListSubheader>
          )}
          style = {{backgroundColor : 'white'}}
          className={classes.cartWrap}
        >
          {
            products.length < 1 ? (
              <div className={classes.empty}>
                <Typography variant="subtitle1">Empty Cart</Typography>
                <Typography variant="caption">Your shopping items will be listed here</Typography>
              </div>
            ) : (
              <Fragment>
                {getCartItem(products)}
                <ListItem className={classes.totalPrice}>
                  <Typography variant="subtitle1">
                    Total :
                    <span className={Type.bold}>
                      Rs
                      {totalPrice}
                    </span>
                  </Typography>
                </ListItem>
                <li>
                  <Divider />
                </li>
                <ListItem>
                  <Button fullWidth className={classes.button} variant="contained" onClick={() =>{
                    if(!this.props.profile.invoice_no){
                      this.props.history.push('/app/customer')
                    }else{
                      this.props.updateCreateSale("showConfirmModal",true)
                    }
                    
                  }} color="secondary">
                    Checkout
                  </Button>
                </ListItem>
              </Fragment>
            )
          }
        </List>
      </Menu>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  dataCart: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  close: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

Cart.defaultProps = {
  anchorEl: null,
};

const mapStateToProps = state => {
  return {
    products : state.get('createSale').products,
    profile : state.get('customer').profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeDefaultCombination : (defaultCombination) => dispatch(actions.updateDefaultCombination(defaultCombination)),
    updateCreateSale : (identifier,value) => dispatch(actions.updateCreateSale(identifier,value)), 
    addToCart : (product) => dispatch(actions.addProductToSale(product)),
    updateCart : (index,product) => dispatch(actions.updateCartProduct(index,product)),
    removeCart : (index) => dispatch(actions.removeProductFromSale(index))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(Cart)));

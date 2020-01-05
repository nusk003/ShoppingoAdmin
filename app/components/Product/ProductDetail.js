import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import imgData from 'dan-api/images/imgData';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Type from 'dan-styles/Typography.scss';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';
import Rating from '../Rating/Rating';
import styles from './product-jss';
import { Select, MenuItem, FormControl, InputLabel, Input, Fab, Icon } from '@material-ui/core';
import * as actions from '../../redux/actions/index'
import {connect} from 'react-redux'
import AddToCartButton from './AddToCartButton';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProductDetail extends React.Component {
  state = {
    qty: 1,
    weight : 1
  }
  

  handleQtyChange = event => {
    this.setState({ qty: event.target.value });
  }

  submitToCart = itemAttr => {
    const { handleAddToCart, close } = this.props;
    handleAddToCart(itemAttr);
    close();
  }

 

  render() {
    const {
      classes,
      open,
      close,
      detailContent,
      productIndex,
      activeProduct,
      cartProducts
    } = this.props;

    const { qty,weight } = this.state;

    const itemAttr = (item) => {
      if (item !== undefined) {
        return {
          product : item,
          qty,
          weight
        };
      }
      return false;
    };

    const settings = {
      customPaging: (i) => (
        <a>
          <img src={getThumb[i]} alt="thumb" />
        </a>
      ),
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    let getThumb = []

    if (activeProduct.images){
      getThumb = activeProduct.images.map(a => a);
    }

    let cartCount = 0
    let cartItemIndex = 0
    let cartItem = {}

    console.log(cartProducts)

    cartProducts.map((cp,index)=>{

      if(activeProduct.defaultCombination && cp && activeProduct.defaultCombination.id == cp.product.defaultCombination.id){
        if(cp.product.weightEnabled){
          if(weight === cp.weight){
            cartCount = cp.qty
            cartItemIndex = index
            cartItem = {...cp,...{}}
            return
          }
        }
        else{
          // alert(activeProduct.defaultCombination.id)
          cartCount = cp.qty
          cartItemIndex = index
          cartItem = {...cp,...{}}
          return
        }
      }
      
    })
    // alert(activeProduct.defaultCombination.id)
    return (
      activeProduct ?
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap color="inherit" className={classes.flex}>
              {activeProduct.title}
            </Typography>
            <IconButton color="inherit" onClick={() => close()} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {open &&
        <div className={classes.detailContainer}>
        <Grid container className={classes.root} spacing={24}>
          <Grid item md={5} sm={12} xs={12}>
            <div className="container thumb-nav">
              <Slider {...settings}>
                {activeProduct.images && activeProduct.images.map((item, index) => {
                  if (index >= 5) {
                    return false;
                  }
                  return (
                    <div key={index.toString()} className={classes.item}>
                      <img src={item}  />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </Grid>
          <Grid item md={7} sm={12} xs={12}>
            <section className={classes.detailWrap}>
              <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
                {activeProduct.title}
              </Typography>
              <div className={classes.price}>
                <Typography variant="h5">
                  <span>
                    Rs.
                    {activeProduct.defaultCombination ? activeProduct.defaultCombination.sellPrice : 0}
                  </span>
                </Typography>
                {/* {detailContent.getIn([productIndex, 'discount']) !== '' && (
                  <Fragment>
                    <Typography variant="caption" component="h5">
                      <span className={Type.lineThrought}>
                        $
                        {detailContent.getIn([productIndex, 'prevPrice'])}
                      </span>
                    </Typography>
                    <Chip label={'Discount ' + detailContent.getIn([productIndex, 'discount'])} className={classes.chipDiscount} />
                  </Fragment>
                )} */}
                {activeProduct.defaultCombination && !activeProduct.defaultCombination.isStock && (
                  <Chip label="Sold Out" className={classes.chipSold} />
                )}
              </div>
              {/* <div className={classes.ratting}>
                <Rating value={detailContent.getIn([productIndex, 'ratting'])} max={5} readOnly />
              </div> */}
              {/* <Typography component="p" className={classes.desc}>
                {detailContent.getIn([productIndex, 'desc'])}
              </Typography> */}
              {activeProduct.weightEnabled &&
                <FormControl>
                <Typography>Weight</Typography>
                <Input
                    id = "weight-input"
                    placeholder = "Weight"
                    title = "Weight"
                    type="number"
                    
                    InputProps={{ inputProps: { min: 0 } }}
                    margin="none"
                    step = "0.01"
                    defaultValue={qty}
                    className={classes.quantity}
                    onChange={(e)=>this.setState({weight : e.target.value})}
                  />
                  </FormControl>
              }

              {activeProduct.combinations &&
                activeProduct.combinations.length > 1 ?
                <Select
                  onChange = {(e)=>
                    this.props.changeDefaultCombination({...e.target.value,...{}})
                  }
                  value = {activeProduct.defaultCombination}
                  renderValue = {({value})=>`${value}`}

                >
                {activeProduct.combinations.map((combination,index)=>
                  <MenuItem  key = {index}  value = {combination}  >{combination.value}</MenuItem>
                )}
                </Select>

                :

                <Typography>
                  {activeProduct.defaultCombination && activeProduct.defaultCombination.value}
                </Typography>

              }
              
              {activeProduct.defaultCombination && activeProduct.defaultCombination.isStock && (
                <div className={classes.btnArea}>
                
                  <AddToCartButton qty = {cartCount} 
                    list = {true}
                    onAddToCart = {()=>this.props.addToCart({product:{...activeProduct},qty,weight})} 
                    onPlus = {()=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty:parseInt(cartCount) + 1}})}
                    onMinus = {()=>{
                      cartCount===1 ? this.props.removeCart(cartItemIndex)
                      :
                      this.props.updateCart(cartItemIndex,{...cartItem,...{qty : parseInt(cartCount) - 1}})
                    }}
                    onChange = {(qty)=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty}})}
                  />

                </div>
              )}
            </section>
          </Grid>
        </Grid>
      </div>
        }
        
      </Dialog>
      :
      null
    );
  }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  detailContent: PropTypes.array.isRequired,
  productIndex: PropTypes.number,
  activeProduct : PropTypes.object.isRequired
};

ProductDetail.defaultProps = {
  productIndex: 1
};

const mapStateToProps = state => {
  return {
    cartProducts : state.get('createSale').products,
    activeProduct : state.get('getProducts').activeProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeDefaultCombination : (defaultCombination) => dispatch(actions.updateDefaultCombination(defaultCombination)),
    addToCart : (product) => dispatch(actions.addProductToSale(product)),
    updateCart : (index,product) => dispatch(actions.updateCartProduct(index,product)),
    removeCart : (index) => dispatch(actions.removeProductFromSale(index))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ProductDetail));

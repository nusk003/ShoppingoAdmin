import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Type from 'dan-styles/Typography.scss';
import Rating from '../Rating/Rating';
import styles from './cardStyle-jss';
import { connect } from 'react-redux'
import AddToCartButton from '../Product/AddToCartButton';
import * as actions from '../../redux/actions/'

class ProductCard extends React.Component {

  state = {
    qty : 1,
    weight : 1
  }

  render() {

    const {
      classes,
      discount,
      soldout,
      thumbnail,
      name,
      desc,
      ratting,
      sellPrice,
      prevPrice,
      variant,
      list,
      detailOpen,
      addToCart,
      width,
      cartProducts,
      activeProduct
    } = this.props;
    // console.log(activeProduct)
    const {weight,qty} = this.state

    let cartCount = 0
    let cartItemIndex = 0
    let cartItem = {}
    console.log(cartProducts.length)
    cartProducts.map((cp,index)=>{
      
      if(activeProduct.defaultCombination && cp && activeProduct.defaultCombination.id === cp.product.defaultCombination.id){
        if(cp.product.weightEnabled){
          if(weight === cp.weight){
            cartCount = cp.qty
            cartItemIndex = index
            cartItem = cp
            return
          }
        }
        else{
          cartCount = cp.qty
          cartItemIndex = index
          cartItem = cp
          return
        }
      }
      
    })

    return (
      <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
        <div className={classes.status}>
          {/* {discount !== '' && (
            <Chip label={'Discount ' + discount} className={classes.chipDiscount} />
          )} */}
          {soldout && (
            <Chip label="Sold Out" className={classes.chipSold} />
          )}
        </div>
        <CardMedia
          className={classes.mediaProduct}
          image={thumbnail}
          placeholder = {'../../../public/images/product_placeholder.png'}
          title={name}
        />
        <CardContent className={classes.floatingButtonWrap}>
          {!soldout && !list && (
            <AddToCartButton qty = {cartCount} 
              list = {list}
              onAddToCart = {()=>this.props.addToCart({product:activeProduct,qty,weight})} 
              onPlus = {()=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty:parseInt(cartCount) + 1}})}
              onMinus = {()=>{
                cartCount===1 ? this.props.removeCart(cartItemIndex)
                :
                this.props.updateCart(cartItemIndex,{...cartItem,...{qty : parseInt(cartCount) - 1}})
              }}
              onChange = {(qty)=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty}})}
            />
          )}
          <Typography noWrap gutterBottom className={classes.title} component="h5">
            {name}
          </Typography>
          <Typography component="p" className={classes.desc}>
          {!activeProduct.weightEnabled ?
            variant
          :
            ""
          }
          </Typography>
          {/* <Typography component="p" className={classes.desc}>
            {desc}
          </Typography> */}
          {/* <div className={classes.ratting}>
            <Rating value={ratting} max={5} readOnly />
          </div> */}
        </CardContent>
        <CardActions className={classes.price}>
          <Typography variant="h7" component = "h5" >
            <span>
              Rs.
              {sellPrice}
            </span>
          </Typography>
          {/* {prevPrice > 0 && (
            <Typography variant="caption" component="h5">
              <span className={Type.lineThrought}>
                $
                {prevPrice}
              </span>
            </Typography>
          )} */}
          <div className={classes.rightAction}>
            <Button size="small" variant="outlined" color="secondary" onClick={detailOpen}>
              See Detail
            </Button>
            {!soldout && list && (
              <div>
              <AddToCartButton 
              list = {list}
              qty = {cartCount} 
              onAddToCart = {()=>this.props.addToCart({product:activeProduct,qty,weight})} 
              onPlus = {()=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty:cartCount + 1}})}
              onMinus = {()=>{
                qty===1 ? this.props.removeCart(cartItemIndex)
                :
                this.props.updateCart(cartItemIndex,{...cartItem,...{qty : cartCount - 1}})
              }}
              onChange = {(qty)=>this.props.updateCart(cartItemIndex,{...cartItem,...{qty}})}
              />
              </div>
            )}
          </div>
        </CardActions>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  discount: PropTypes.string,
  width: PropTypes.string.isRequired,
  soldout: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  ratting: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  discount: '',
  soldout: false,
  prevPrice: 0,
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

const ProductCardResponsive = withWidth()(ProductCard);

const mapStateToProps = state => {
  return {
    cartProducts : state.get('createSale').products
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ProductCardResponsive));

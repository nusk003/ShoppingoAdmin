import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../CardPaper/ProductCard';
import ProductDetail from './ProductDetail';
import { CircularProgress, Modal } from '@material-ui/core';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index'

class ProductGallery extends React.Component {
  state = {
    open: false,
  }

  componentDidMount () {
    var azul = document.getElementById("azul");
   
    azul.onmouseover = function(){
      document.body.style.overflowY = this.props.loading ? "hidden" : "auto";
    };

    azul.onmouseout = function(){
      document.body.style.overflowY = this.props.loading ? "hidden" : "auto";
    };
  }

  handleDetailOpen = (product) => {
    const { showDetail } = this.props;
    this.setState({ open: true });
    console.log("Check")
    console.log(product)
    showDetail(product);
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { open } = this.state;
    const {
      dataProduct,
      handleAddToCart,
      productIndex,
      keyword,
      activeProduct,
      listView,
      loading
    } = this.props;
    console.log(dataProduct)
    return (
      <div id = "azul" >
        <ProductDetail
          open={open}
          close={this.handleClose}
          detailContent={dataProduct}
          productIndex={productIndex}
          handleAddToCart={handleAddToCart}
        />
        {loading &&
        <div style = {{backgroundColor:'rgba(255,255,255,0.5)',display : 'flex',width : '100%',height:'75vh',position : 'absolute',justifyContent : 'center',alignItems : 'center',zIndex : 10}} >
          <CircularProgress/>
        </div>
        }
        
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={24}
        >
        
          {/* <Modal style = {{display : 'flex',flexDirection : 'column',alignItems : 'center',justifyContent : 'center'}} open = {loading} >
            <CircularProgress />
          </Modal> */}
        
         { dataProduct.map((product, index) => {
            
            const itemAttr = {product,qty:1,weight:0}
            return (
              <Grid item md={listView === 'list' ? 12 : 3} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                <ProductCard
                  list={listView === 'list'}
                  name={product.title}
                  activeProduct = {product}
                  thumbnail={product.images[0]}
                  variant = {product.defaultCombination ? product.defaultCombination.value : ""}
                  // desc={product.get('desc')}
                  // ratting={product.get('ratting')}
                  sellPrice={product.defaultCombination? product.defaultCombination.sellPrice : 0}
                  // prevPrice={product.get('prevPrice')}
                  costPrice = {product.defaultCombination? product.defaultCombination.costPrice : 0}
                  // discount={product.get('discount')}
                  soldout={product.defaultCombination ? !product.defaultCombination.isStock : false}
                  detailOpen={() => this.handleDetailOpen(product)}
                  addToCart={() => handleAddToCart(itemAttr)}
                />
              </Grid>
            );
          })}
        
        
          
        </Grid>
      </div>
    );
  }
}

ProductGallery.propTypes = {
  dataProduct: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    loading : state.get('getProducts').loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductGallery);

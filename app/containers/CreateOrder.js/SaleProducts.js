import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/productData';
import { SearchProduct, ProductGallery, Notification } from 'dan-components';
import * as actions from '../../redux/actions/index'
import {
  fetchAction,
  addAction,
  removeAction,
  checkoutAction,
  detailAction,
  searchAction,
  closeNotifAction
} from 'dan-actions/EcommerceActions';
import { Modal, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Switch, FormControlLabel, Typography, CircularProgress } from '@material-ui/core';
import Ionicon from 'react-ionicons';
 
class SaleProducts extends React.Component {
  state = {
    listView: 'grid',
  }

  componentDidMount() {
    const { fetchData } = this.props;
    // fetchData("a");
  }

  handleSwitchView = (event, value) => {
    this.setState({
      listView: value
    });
  }

  render() {
    const title = brand.name + ' - Products';
    const description = brand.desc;
    const { listView } = this.state;
    const {
      dataProduct,
      handleAddToCart,
      dataCart,
      removeItem,
      checkout,
      showDetail,
      productIndex,
      totalItems,
      search,
      keyword,
      closeNotif,
      messageNotif,
      activeProduct,
      createSale,
      profile
    } = this.props;
    console.log(dataProduct)

    let totalPrice = 0

    for (let {product,qty,weight} of createSale.products) {

      totalPrice += parseFloat(product.defaultCombination.sellPrice) * qty * weight
      
    }

    return (
      <div>
       
        <Dialog
          open = {createSale.showConfirmModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Confirm Sale</DialogTitle>
          <form
            onSubmit = {(e)=>{
              e.preventDefault()
              this.props.oncreateSale()
            }}
          >
          {profile &&
          <DialogContent>
            <DialogContentText>Customer : {profile.f_name} {profile.l_name}</DialogContentText>
            <DialogContentText>Deliver Address : {createSale.address}</DialogContentText>
            <DialogContentText>Total Amount : Rs.{totalPrice}</DialogContentText>
            <DialogContentText>No of Unique Items : {createSale.products.length}</DialogContentText>
            <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Invoice No"
                type="text"
                value = {createSale.invoice_no}
                onChange = {(e)=>this.props.updateCreateSale("invoice_no",e.target.value)}
                fullWidth
              />
            <FormControlLabel
                control={(
                  <Switch
                    
                    checked={createSale.sms}
                    onChange={()=>this.props.updateCreateSale("sms",!createSale.sms)}
                  />
                )}
                label="SMS Service"
            />
          </DialogContent>
          }
          
          <DialogActions>
              <Button onClick={()=>this.props.updateCreateSale("showConfirmModal",false)} color="primary">
                Cancel
              </Button>
              <Button type = "submit"  color="primary">
                Confirm
              </Button>
          </DialogActions>
          </form>
        </Dialog>

        <Modal style = {{display:'flex',justifyContent:'center',alignItems : 'center'}} open = {createSale.loading} >
          <div  >
            <CircularProgress/>
          </div>
        </Modal>

        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={createSale.notification} />
        
        <SearchProduct
          dataCart={dataCart}
          dataProduct={dataProduct}
          removeItem={removeItem}
          checkout={checkout}
          totalItems={totalItems}
          totalPrice={totalPrice}
          search={search}
          keyword={keyword}
          listView={listView}
          handleSwitchView={this.handleSwitchView}
        />
        <ProductGallery
          activeProduct = {activeProduct}
          listView={listView}
          dataProduct={dataProduct}
          showDetail={showDetail}
          handleAddToCart={handleAddToCart}
          productIndex={productIndex}
          keyword={keyword}
        />
      </div>
    );
  }
}

SaleProducts.propTypes = {
  fetchData: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  dataProduct: PropTypes.array.isRequired,
  dataCart: PropTypes.object.isRequired,
  productIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'ecommerce';
const mapStateToProps = state => ({
  createSale : state.get('createSale'),
  profile : state.get('customer').profile,
  force: state, // force state from reducer
  keyword: state.getIn([reducer, 'keywordValue']),
  dataProduct: state.get("getProducts").products,
  activeProduct: state.get("getProducts").activeProduct,
  dataCart: state.getIn([reducer, 'cart']),
  productIndex: state.getIn([reducer, 'productIndex']),
  totalItems: state.getIn([reducer, 'totalItems']),
  totalPrice: state.getIn([reducer, 'totalPrice']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const constDispatchToProps = dispatch => ({
  updateCreateSale : (identifier,value) => dispatch(actions.updateCreateSale(identifier,value)),
  oncreateSale : () =>dispatch(actions.createSale()),
  fetchData: (query) => dispatch(actions.getProducts(query)),
  search: (query) => dispatch(actions.getProducts(query)),
  handleAddToCart: (product) => dispatch(actions.addProductToSale(product)),
  removeItem: bindActionCreators(removeAction, dispatch),
  showDetail: (activeProduct)=>dispatch(actions.setActiveProduct(activeProduct)),
  checkout: () => dispatch(checkoutAction),
  closeNotif: () => dispatch(actions.closeNotification()),
});

const SalesProductsMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(SaleProducts);

export default SalesProductsMapped;

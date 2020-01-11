import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { Grid, Input, InputLabel, FormControl, Button, Icon, Modal, CircularProgress} from '@material-ui/core';
import AddCustomer from './AddCustomer';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index'

class SelectCustomer extends React.Component {

  state = {
    phone : ""
  }

  render() {
    const title = "Find Customer";
    const description = "You can find the customer here";

    const {customer,getCustomer,closeAddCustomerModal} = this.props
    return (
      <div>
        
        <Modal onClose = {closeAddCustomerModal} style = {{display : 'flex',flex:1,justifyContent:'center',alignItems : 'center'}}  open = {customer.showAddCustomerModal} >
          <div style = {{width : '100%'}} >
          <AddCustomer onSubmit = {this.props.createCustomer} />
          </div>
        </Modal>
        <Modal style = {{display : 'flex',justifyContent:'center',alignItems : 'center'}} open = {customer.loading} > 
          <CircularProgress size = {50}/>
        </Modal>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Find Customer" desc="Find your customer here">
          <Grid>
          <form onSubmit = {(e)=>{
              e.preventDefault()
              getCustomer(this.state.phone)
            }} >
            <FormControl fullWidth >
                <InputLabel htmlFor="adornment-amount">Enter Customer Mobile Number</InputLabel>
                <Input 
                  type = "number"
                  required
                  id="adornment-amount"
                  placeholder = "Enter Customer Mobile Number"
                  onChange={(e)=>this.setState({phone:e.target.value})}
                />
            </FormControl>
            <FormControl style = {{display:'flex' , alignItems : 'center'}} >
                <Button style = {{marginTop : 4}} type = "submit" variant="contained" color="primary">
                    Go
                <Icon style = {{marginLeft : 4}} >send</Icon>
                </Button>
            </FormControl>
        </form>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer : state.get('customer')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCustomer : phone => dispatch(actions.getCustomer(phone)),
    createCustomer : customer => dispatch(actions.createCustomer(customer)),
    closeAddCustomerModal : () => dispatch(actions.closeAddCustomerModal())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SelectCustomer);

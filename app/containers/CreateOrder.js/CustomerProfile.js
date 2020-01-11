import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from 'dan-api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/timelineData';
import { fetchAction } from 'dan-actions/SocmedActions';
import {
  Cover,
  About,
  Connection,
  Favorites,
  Albums
} from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import { Button, Select, MenuItem, FormControl, FormLabel, InputLabel, Input, Modal, CircularProgress } from '@material-ui/core';
import * as actions from '../../redux/actions/index'
import AddAddress from './AddAddress';

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class CustomerProfile extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(data);
    const {profile} = this.props.customer

    if(profile.addresses && profile.addresses.length > 0 ){
      this.props.updateCreateSale("address",profile.addresses[0].address)
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const { profile, phone } = this.props.customer;
    const { customer,closeAddAddressModal } = this.props;
    const { value } = this.state;
    console.log(customer)
    return (
      <div>
        <Modal onClose = {closeAddAddressModal} style = {{display : 'flex',flex:1,justifyContent:'center',alignItems : 'center'}}  open = {customer.showAddAddressModal} >
          <div style = {{width : '100%'}} >
          <AddAddress onSubmit = {this.props.addAddress} />
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
        <Cover
          coverImg={bgCover}
          avatar={dummy.user.avatar}
          name={profile.f_name + " " + profile.l_name}
          desc={phone}
          onClick = {()=>alert("Ok")}
        />
        <form>
        <div style = {{display:'flex',flexDirection:'column',alignItems : 'center'}} >
        <div style = {{marginBottom : 10}} >
        {profile.addresses && profile.addresses.length > 0 &&
        <FormControl>
          <InputLabel htmlFor = "select-address" >Select Address</InputLabel>
          <Select
            input={<Input id="select-address" />}
            MenuProps = {MenuProps}
            style = {{width : '50vw'}}
            onChange = {(e)=>this.props.updateCreateSale("address",e.target.value)}
            value = {this.props.createSale.address}
          >
            {profile.addresses.map((address,index)=>
              <MenuItem value = {address.address}  key = {index} >{address.address}</MenuItem>  
            )}
          </Select>
        </FormControl>
        }
        </div>
        <div style = {{display : 'flex',flex:1,flexDirection:'row',justifyContent : 'space-evenly'}} >
        {profile.addresses && profile.addresses.length > 0 &&
        <Button onClick = {()=>this.props.history.push('/app/add-products')} style = {{margin:10}} variant="contained" color = "secondary"  >
          Create Order
        </Button>
        }
          
          <Button onClick = {()=>this.props.showAddAddressModal()} style = {{margin:10}} variant="contained" color = "secondary" >
            Add Address
          </Button>
        </div>
        </div>
        </form>
        {/* <AppBar position="static" className={classes.profileTab}>
          <Hidden mdUp>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} />
              <Tab icon={<SupervisorAccount />} />
              <Tab icon={<Favorite />} />
              <Tab icon={<PhotoLibrary />} />
            </Tabs>
          </Hidden>
          <Hidden smDown>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} label="ABOUT" />
              <Tab icon={<SupervisorAccount />} label="20 CONNECTIONS" />
              <Tab icon={<Favorite />} label="18 FAVORITES" />
              <Tab icon={<PhotoLibrary />} label="4 ALBUMS" />
            </Tabs>
          </Hidden>
        </AppBar>
        {value === 0 && <TabContainer><About data={dataProps} /></TabContainer>}
        {value === 1 && <TabContainer><Connection /></TabContainer>}
        {value === 2 && <TabContainer><Favorites /></TabContainer>}
        {value === 3 && <TabContainer><Albums /></TabContainer>} */}
      </div>
    );
  }
}

CustomerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  dataProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const reducer = 'socmed';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataProps: state.getIn([reducer, 'dataTimeline']),
  customer : state.get('customer'),
  createSale : state.get('createSale')
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  updateCreateSale : (identifier,value) => dispatch(actions.updateCreateSale(identifier,value)),
  addAddress : (address) => dispatch(actions.addAddress(address)),
  showAddAddressModal : () => dispatch(actions.showAddAddressModal()),
  closeAddAddressModal : () => dispatch(actions.closeAddAddressModal())
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(CustomerProfile);

export default withStyles(styles)(UserProfileMapped);

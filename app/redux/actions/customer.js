import * as actionTypes from './actionTypes'
import Axios from 'axios';
import {useHistory} from 'react-router-dom'
import history from '../../utils/history';
import * as actions from '../actions/index'

export const getCustomerStart = () => {
    return {
        type : actionTypes.GET_CUSTOMER_START
    }
}

export const getCustomerSuccess = (customer) => {
    return {
        type : actionTypes.GET_CUSTOMER_SUCCESS,
        customer
    }
}

export const getCustomerFail = error => {
    return {
        type : actionTypes.GET_CUSTOMER_FAIL,
        error
    }
}

export const  showAddCustomerModal = (phone) => {
    return {
        type : actionTypes.SHOW_ADD_CUSTOMER_MODAL,
        phone
    }
}

export const closeAddCustomerModal = () => {
    return {
        type : actionTypes.CLOSE_ADD_CUSTOMER_MODAL
    }
}

export const showAddAddressModal = () => {
    return {
        type : actionTypes.SHOW_ADD_ADDRESS_MODAL
    }
}

export const closeAddAddressModal = () => {
    return {
        type : actionTypes.CLOSE_ADD_ADDRESS_MODAL
    }
}

export const createCustomerStart = () => {
    return {
        type : actionTypes.CREATE_CUSTOMER_START
    }
}

export const createCustomerSuccess = profile => {
    return {
        type : actionTypes.CREATE_CUSTOMER_SUCCESS,
        profile
    }
}

export const createCustomerFail = error => {
    return {
        type : actionTypes.CREATE_CUSTOMER_FAIL,
        error
    }
}

export const addAddressStart = () => {
    return {
        type : actionTypes.ADD_ADDRESS_START
    }
}

export const addAddressSuccess = (address) => {
    return {
        type : actionTypes.ADD_ADDRESS_SUCCESS,
        address
    }
}

export const addAddressFail = error => {

    return {
        type : actionTypes.ADD_ADDRESS_FAIL,
        error
    }
}

export const getCustomer = (phone) => {
    return (dispatch) => {
        dispatch(getCustomerStart())
        const formData = new FormData()
        formData.set("phone",phone)
        Axios.post(`https://shoppingo.lk/api/orders/check_user.php`,formData,{headers : {'Content-Type': 'application/json'}})
        .then(async({data})=>{
            // alert(data)
            if(data.profile !== null){
                // alert(1)
                await history
                dispatch(getCustomerSuccess(data.profile))
                dispatch(actions.updateCreateSale("invoice_no",data.profile.invoice_no))
                history.push('/app/customer-profile')
            }
            else{
                dispatch(getCustomerFail("Customer Doesn't exist"))
                dispatch(showAddCustomerModal(phone))
            }
        })
        .catch(error=>{
            // alert(JSON.stringify(error))
            dispatch(getCustomerFail(error.message))

        })
    }
}

export const createCustomer = (customer) => {

    return dispatch => {
        dispatch(createCustomerStart())

        const formData = new FormData()
        formData.set("phone",customer.get('phone'))
        formData.set("f_name",customer.get('f_name'))
        formData.set("l_name",customer.get('l_name'))
        formData.set("address",customer.get('address'))

        Axios.post(`https://shoppingo.lk/api/account/create_user.php`,formData)
        .then( async ({data})=>{
            if(data.success) {
                await history
                dispatch(createCustomerSuccess(data.profile))
                dispatch(closeAddCustomerModal())
                dispatch(actions.updateCreateSale("invoice_no",data.profile.invoice_no))
                history.push('/app/customer-profile')
            }
            else{
                dispatch(createCustomerFail(data.message))
                alert(data.message)
            }
        })
        .catch(error=>{
            dispatch(createCustomerFail(error.message))
            alert(error.message)
        })
    }
}

export const addAddress = (address) => {
    return (dispatch,getState) => {

        dispatch(addAddressStart())

        const {user_id} = getState().get('customer').profile
        const formData = new FormData()
        const address_str = address.get('address')

        formData.set("user_id",user_id)
        formData.set("address",address_str)

        Axios.post(`https://shoppingo.lk/api/account/add_address.php`,formData)
        .then(({data})=>{
            if(data.success) {
                // alert(100)
                dispatch(addAddressSuccess({add_id : data.address_id,address : data.address_created}))
            }
            else{
                alert(data.message)
                dispatch(addAddressFail(data.message))
            }
        })
        .catch(error=> {
            alert(error.message)
            dispatch(addAddressFail(error.message))
        })

    }
}


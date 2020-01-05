import * as actionTypes from './actionTypes'
import Axios from 'axios';
import history from '../../utils/history';

export const updateCreateSale = (identifier,value) => {

    return {
        type : actionTypes.UPDATE_CREATE_SALE,
        identifier,
        value
    }
}

export const addProductToSale = (product) => {
    return {
        type : actionTypes.ADD_PRODUCT_TO_BILL,
        product
    }
}

export const removeProductFromSale = (index) => {
    return {
        type : actionTypes.REMOVE_PRODUCT_FROM_BILL,
        index
    }
}

export const updateCartProduct = (index,product) => {
    return {
        type : actionTypes.UPDATE_PRODUCT,
        index,
        product
    }
}

export const createSaleStart = () => {
    return {
        type : actionTypes.CREATE_SALE_START
    }
}

export const createSaleSuccess = (sale) => {
    return {
        type : actionTypes.CREATE_SALE_SUCCESS,
        sale
    }
}

export const createSaleFail = error => {
    return {
        type : actionTypes.CREATE_SALE_FAIL,
        error
    }
}

export const closeNotification = (notification = "") => {
    return {
        type : actionTypes.CLOSE_NOTIFICATION,
        notification
    }
}

export const createSale =  () => {
    return (dispatch,getState) => {
        dispatch(createSaleStart())
        const {user_id} = getState().get('customer').profile
        const {address,products,invoice_no,sms} = getState().get('createSale')

        let items = []

        for (let {product,weight,qty} of products) {
            items.push({
                qty,
                weight,
                sellPrice : product.defaultCombination.sellPrice,
                costPrice : product.defaultCombination.costPrice,
                id : product.defaultCombination.id,
                weightEnabled : product.weightEnabled
            })
        }

        const formData = new FormData()
        formData.set('order',JSON.stringify({
            invoice_no,
            user_id,
            address,
            sms,
            items
        }))

        Axios.post(`https://shoppingo.lk/api/orders/create_order_for_admin.php`,formData)
        .then(({data})=>{
            // alert(data)
            if (data.success) {
                // alert(data.message)
                dispatch(createSaleSuccess(data.message))
                dispatch(closeNotification(data.message))
            }
            else{
                // alert(data.message)
                dispatch(createSaleFail(data.message))
            }
        })
        .catch(error=>{
            // alert(error.message)
            dispatch(createSaleFail(error.message))
        })
    }
}

import * as actionTypes from './actionTypes'
import Axios from 'axios';

export const getProductStart = () => {
    return {
        type  : actionTypes.GET_PRODUCTS_START
    }
}

export const getProductsSuccess = (products) => {
    return {
        type : actionTypes.GET_PRODUCTS_SUCCESS,
        products
    }
}

export const getProductsFail = error => {
    return {
        type : actionTypes.GET_PRODUCTS_FAIL,
        error
    }
}

export const setActiveProduct = activeProduct => {
    console.log("action")
    console.log(activeProduct)
    return {
        type : actionTypes.SET_ACTIVE_PRODUCT,
        activeProduct
    }
}

export const updateDefaultCombination = defaultCombination => {
    return {
        type : actionTypes.UPDATE_DEFAULT_COMBINATION,
        defaultCombination
    }
}


export const getProducts = query => {

    return dispatch => {
        dispatch(getProductStart())

        Axios.get(`https://shoppingo.lk/api/products/product_search_for_admin.php/?query=${query}`)
        .then(({data})=>{
            dispatch(getProductsSuccess(data))
        })
        .catch(error=>{
            alert(error.message)
            dispatch(getProductsFail(error.message))
        })
    }
}
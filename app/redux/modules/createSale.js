import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading : false,
    products : [],
    address : null,
    error : null,
    invoice_no : null,
    sms : true,
    showConfirmModal : false,
    notification : ""
}

const updateCreateSale = (state = initialState,{identifier,value}) => {
    // alert(value)
    return {
        ...state,...{[identifier]:value}
    }
}

const createSaleStart = (state=initialState) => {
    return {
        ...state,...{loading : true}
    }
}

const createSaleSuccess = (state=initialState,{sale}) => {
    const newState = {...state,...{}}
    const newProducts = []
    newState.products = newProducts
    newState.loading = false
    newState.showConfirmModal = false
    return {
        ...state,...newState
    }
}

const createSaleFail = (state=initialState,{error}) => {
    return {
        ...state,...{loading : false,notification : error}
    }
}

const addProductToSale = (state=initialState,{product}) => {

    const newState = {...state,...{}}
    const products = newState.products
    products.push(product)
    let newProducts = []

    for (let newProduct of products){
        newProducts.push(newProduct)
    }

    newState.products = newProducts

    return {...state,...newState}
}

const removeProductFromSale = (state=initialState,{index}) => {

    const newState = {...state,...{}}
    const products = newState.products
    
    products.splice(index,1)

    let newProducts = []

    for (let newProduct of products){
        newProducts.push(newProduct)
    }

    newState.products = newProducts
    return {...state,...newState}
}

const updateProduct = (state=initialState,{index,product}) => {
    // alert(product.qty)
    const newState = {...state,...{}}
    const products = newState.products

    products[index] = product

    let newProducts = []

    for (let newProduct of products){
        newProducts.push(newProduct)
    }

    newState.products = newProducts

    return {...state,...newState}
}
 
export default (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.UPDATE_CREATE_SALE : return updateCreateSale(state,action)
        case actionTypes.ADD_PRODUCT_TO_BILL : return addProductToSale(state,action)
        case actionTypes.REMOVE_PRODUCT_FROM_BILL : return removeProductFromSale(state,action)
        case actionTypes.UPDATE_PRODUCT : return updateProduct(state,action)
        case actionTypes.CREATE_SALE_START : return createSaleStart(state,action)
        case actionTypes.CREATE_SALE_SUCCESS : return createSaleSuccess(state,action)
        case actionTypes.CREATE_SALE_FAIL : return createSaleFail(state,action)
        case actionTypes.CLOSE_NOTIFICATION : return {...state,...{notification : action.notification}}
        default : return state
    }
}
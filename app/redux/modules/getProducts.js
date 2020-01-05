import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading : false,
    products : [],
    error : null,
    productIndex : -1,
    activeProduct : {}
}


const getProductsStart = (state=initialState,action) => {
    return {
        ...state,...{loading : true}
    }
}

const getProductsSuccess = (state=initialState,{products}) => {
    // alert(products.length)
    return {
        ...state,...{loading : false,products}
    }
}

const getProductsFail = (state=initialState,{error})=>{
    return {
        ...state,...{error,loading : false}
    }
}

const setActiveProduct = (state=initialState,{activeProduct}) => {
    console.log("reducer")
    console.log(activeProduct)
    return {
        ...state,...{activeProduct}
    }
}

const updateDefaultCombination = (state = initialState,{defaultCombination}) => {

    const newState = {...state,...{}}
    newState.activeProduct.defaultCombination = defaultCombination

    return {
        ...state,...newState
    }
}

export default (state=initialState,action) => {
    switch(action.type){
        case actionTypes.GET_PRODUCTS_START : return getProductsStart(state,action)
        case actionTypes.GET_PRODUCTS_SUCCESS : return getProductsSuccess(state,action)
        case actionTypes.GET_PRODUCTS_FAIL : return getProductsFail(state,action)
        case actionTypes.SET_ACTIVE_PRODUCT : return setActiveProduct(state,action)
        case actionTypes.UPDATE_DEFAULT_COMBINATION : return updateDefaultCombination(state,action)
        default : return state
    }
}
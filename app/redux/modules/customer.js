import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading : false,
    profile : {},
    phone : "",
    showAddCustomer : false,
    showAddAddressModal : false
}

const getCustomerStart = (state = initialState) => {
    return {...state, ...{loading : true}}
}

const addAddressStart = (state=initialState) => {
    return {...state,...{loading : true}}
}

const addAddressSuccess = (state=initialState,{address}) => {

    const newState = {...state,...{}}
    const addresses = newState.profile.addresses

    addresses.push(address)

    newState.profile.addresses = addresses
    newState.loading = false
    newState.showAddAddressModal = false
    return {...state,...newState}
}


const addAddressFail = (state=initialState,{error}) => {

    return {
        ...state,...{error,loading : false}
    }
}

const showAddAddressModal = (state=initialState) => {
    return {...state,...{showAddAddressModal : true}}
}

const closeAddAddressModal = (state=initialState) => {
    return {
        ...state,...{showAddAddressModal:false}
    }
}

const getCustomerSuccess = (state = initialState,{customer,phone}) => {
    return {...state, ...{profile : customer,loading :  false,phone}}
}

const getCustomerFail = (state = initialState,{error}) => {
    return {...state,...{error,loading : false}}
}

const showAddCustomerModal = (state = initialState,{phone}) => {
    return {...state,...{showAddCustomerModal : true,phone}}
}

const closeAddCustomerModal = (state = initialState) => {
    return {...state,...{showAddCustomerModal : false,phone : ""}}
}

const createCustomerStart = (state=initialState) => {
    return {
        ...state,...{loading : true}
    }
}

const createCustomerSuccess = (state=initialState,{profile,phone}) => {
    return {
        ...state,...{loading : false,profile,phone}
    }
}

const createCustomerFail = (state=initialState,{error}) => {
    return {
        ...state,...{loading : false,error}
    }
}

const customer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.GET_CUSTOMER_START : return getCustomerStart(state,action)
        case actionTypes.GET_CUSTOMER_SUCCESS : return getCustomerSuccess(state,action)
        case actionTypes.GET_CUSTOMER_FAIL : return getCustomerFail(state,action)

        case actionTypes.SHOW_ADD_CUSTOMER_MODAL : return showAddCustomerModal(state,action)
        case actionTypes.CLOSE_ADD_CUSTOMER_MODAL : return closeAddCustomerModal(state,action)

        case actionTypes.SHOW_ADD_ADDRESS_MODAL : return showAddAddressModal(state,action)
        case actionTypes.CLOSE_ADD_ADDRESS_MODAL : return closeAddAddressModal(state,action)

        case actionTypes.ADD_ADDRESS_START : return addAddressStart(state,action)
        case actionTypes.ADD_ADDRESS_SUCCESS : return addAddressSuccess(state,action)
        case actionTypes.ADD_ADDRESS_FAIL : return addAddressFail(state,action)

        case actionTypes.CREATE_SALE_SUCCESS : return initialState

        case actionTypes.CREATE_CUSTOMER_START : return createCustomerStart(state,action)
        case actionTypes.CREATE_CUSTOMER_SUCCESS : return createCustomerSuccess(state,action)
        case actionTypes.CREATE_CUSTOMER_FAIL : return createCustomerFail(state,action)
        default : return state
    }
} 

export default customer
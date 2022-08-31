const initialState = {
    transactionModalVisible: false
}

export const SET_TRANSATION_MODAL_VISIBILITY = 'SET_TRANSATION_MODAL_VISIBILITY'

export const tabReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_TRANSATION_MODAL_VISIBILITY : 
            return {
                ...state,
                transactionModalVisible: action.payload.isVisible
            }
        default : 
            return state
    }
}


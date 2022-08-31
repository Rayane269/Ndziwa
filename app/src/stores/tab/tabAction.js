import { SET_TRANSATION_MODAL_VISIBILITY } from "./tabReducer"

export const setTransactionModalVisibility = (isVisible) => ({
    type: SET_TRANSATION_MODAL_VISIBILITY,
    payload: { isVisible }
})
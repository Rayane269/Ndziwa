import { combineReducers } from "redux"
import { tabReducer } from "./tab/tabReducer"
import { userReducer } from "./user/userReducer"
import { contactReducer } from "./contact/contactReducer"
import { groupReducer } from "./group/groupReducer"

export default combineReducers({
    tabReducer,
    userReducer,
    contactReducer,
    groupReducer
})

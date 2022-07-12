import React, { useState, useCallback, useMemo } from "react";
import { ViewComponent, View } from "react-native";
import { SIZES } from "../../../constants";

/**
 * Créer une formulaire en utilisant un context
 * 
 * @param {React.Context} context
 * @param {Object} defaultValue
 * @param {ViewComponent} children
 * 
 * @return {React.Context}
 */
const FormContext = ({context, defaultValue, children}) => {

    const [data, setData] = useState(defaultValue)
    const change = useCallback((name, value) => setData(d => (Object.assign({}, d, {[name]: value}))))
    const value = useMemo(() => (Object.assign({}, data, {change: change})), [data, change])
    
    return (
        <context.Provider value={value}>
            <View style={{
                marginTop: SIZES.padding * 4,
                marginHorizontal: SIZES.padding * 2
            }}>
                {children}
            </View>
        </context.Provider>
    )
}

export default FormContext
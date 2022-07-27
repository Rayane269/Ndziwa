import React, { useState, useCallback, useMemo } from "react";
import { ViewComponent, View } from "react-native";
import { SIZES } from "../../../constants";

/**
 * Créer une formulaire en utilisant un context
 * 
 * @param {{context: context, style: Object, defaultValue: {...params}}} params
 * @return {React.Context}
 */
const FormContext = ({context, style, defaultValue, children}) => {

    const [data, setData] = useState(defaultValue)
    const change = useCallback((name, value) => setData(d => (Object.assign({}, d, {[name]: value}))))
    const value = useMemo(() => (Object.assign({}, data, {change: change})), [data, change])
    
    return (
        <View>
            <context.Provider value={value}>
                <View style={style}>
                    {children}
                </View>
            </context.Provider>
        </View>
    )
}

export default FormContext
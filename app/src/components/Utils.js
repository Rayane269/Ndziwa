import React, { useEffect } from "react"
import { COLORS, SIZES, icons, FONTS } from "../../constants"
import { View, Image, TouchableOpacity, TouchableHighlight, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { currentUserSelector, registredContact } from "../stores/selectors"
import { getCurrentUserAction, getRegistredContactsAction } from "../stores/actions"

export const RenderLogo = () => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                height: 80,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{
                fontSize: 50,
                color: COLORS.white
            }}>MyDinar</Text>
            {/*<Image 
                source={images.wallieLogo}
                resizeMode="contain"
                style={{
                    width: "60%",
                }}
            />
            */}
        </View>
    )
}

export const LastLink = ({navigation, link, color}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(link)}>
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    marginLeft: SIZES.padding * 2,
                    flexDirection: "row",
                    alignItems: 'center',
                }}
            >
                <Image 
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text style={{ marginLeft: 10, color: color }}>Précédent</Text>
            </View>
        </TouchableOpacity>
    )
}

export const NavigationContactCustom = ({containerStyle, navigation: {goBack, navigate}}) => {
    const { registredContacts: contacts } = useSelector(registredContact)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getRegistredContactsAction())
    }, [])

    return (
        <View
            style={[{
                height: 65,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 12,
            }, containerStyle]}
        >
            <View 
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "80%",
                }}
            >
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Image 
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                        source={icons.back}
                    />
                </TouchableOpacity>
                <View style={{
                    alignItems: "center",
                    marginLeft: 50
                }}>
                    <Text style={{...FONTS.h3, color: COLORS.white}}>Sélection</Text>
                    <Text style={{color: COLORS.white, fontSize: 13}}>{contacts.length} contacts</Text>
                </View>       
            </View>
            <TouchableOpacity
                style={{}}
            >
                <Image 
                    resizeMode="cover"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.white,
                    }}
                    source={icons.search}
                    
                />
            </TouchableOpacity>
        </View>
    )
}

export const RenderHeaderTontine = ({currentUser, text, containerStyle, group, navigation: {goBack, navigate}}) => {
    const authorize = currentUser.roles.indexOf(`GROUP_ADMIN_GROUP_${group}`) === -1 ? true : false
    console.log(authorize, "authorisé")
	return (
		<View style={[{height: 100, padding: SIZES.padding}, containerStyle]}>
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Image 
                        source={icons.back}
                        style={{
                            width: 26,
                            height: 26,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 15,
                    ...FONTS.h4,
                    color: COLORS.white
                }}>{text}</Text>
            </View>
            <TouchableOpacity 
                style={{
                    marginTop: 12,
                    backgroundColor: COLORS.blue,
                    paddingVertical: SIZES.base,
                    borderRadius: SIZES.radius,
                    marginHorizontal: 40,
                }}
                onPress={() => navigate("SendInvitation", {
                    group: group
                })}
                disabled={!authorize}
            >
                <Text 
                    style={{
                        textAlign: "center",
                        color: COLORS.white,
                        ...FONTS.h5
                    }}
                >
                    Ajoutez des participants
                </Text>
            </TouchableOpacity>
		</View>
	)
}

export const RenderHeaderTransaction = ({containerStyle, navigation: {goBack, navigate}}) => {

    
    return (
        <View
            style={[{
                height: 55,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 8,
            }, containerStyle]}
        >
            <View 
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "80%",
                }}
            >
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Image 
                        resizeMode="contain"
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: COLORS.white
                        }}
                        source={icons.back}
                    />
                </TouchableOpacity>
                <View style={{
                    alignItems: "center",
                    marginLeft: 8,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <View
                        style={{
                            backgroundColor: COLORS.gray,
                            width: 28,
                            height: 28,
                            borderRadius: 999,
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}
                    >
                        <Image 
                            source={icons.user}
                            style={{
                                width: "80%",
                                height: "80%",
                                tintColor: COLORS.white
                            }}
                        />
                    </View>
                    <Text style={{
                        marginLeft: 5,
                        color: COLORS.white
                    }}>One Piece❤️💍😁</Text>
                </View>       
            </View>
            
        </View>
    )
}

export const RenderHomeHeader = ({containerStyle, navigation: {goBack, navigation}}) => {
	const { user, loading: loadingUser, errors: authenticated} = useSelector(currentUserSelector)
    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(() => dispatch(getCurrentUserAction()))
	}, [])

    return (
        <View 
            style={[{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                position: "relative",
                width: "100%",
                height: 38,
            }, containerStyle]}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 8,
            }}>
                <TouchableHighlight style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    backgroundColor: COLORS.gray,
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}>
                    <Image 
                        source={icons.user}
                        style={{
                            width: "80%",
                            height: "80%",
                            tintColor: COLORS.white
                        }}
                    />

                </TouchableHighlight>
                <Text style={{
                    fontSize: 15,
                    color: COLORS.white,
                    marginLeft: 10
                }}>
                    Hello M. {user.prenom} !
                </Text>
            </View>

            <TouchableOpacity 
                style={{
                    position: "relative", 
                    height: "100%",
                    width: 47,
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                        textAlign: "center",
                        borderRadius: SIZES.radius,
                        position: "absolute",
                        width: 23,
                        height: 23,
                        top: 0,
                        right: 5,
                        fontSize: 11,
                        paddingTop: 4
                    }}
                >
                    13
                </Text>
                <Image 
                    source={icons.bell}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.white
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export const RenderDefineObjectifHeader = ({containerStyle, navigation: {goBack, navigation}}) => {
    
    return (
        <View
            style={[{
                height: 65,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 12,
            }, containerStyle]}
        >
            <View 
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Image 
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                        source={icons.back}
                    />
                </TouchableOpacity>
                <View style={{
                    alignItems: "center",
                    marginLeft: 50
                }}>
                    <Text style={{...FONTS.h2, color: COLORS.white}}>Définis ton objectif</Text>
                </View>       
            </View>
        </View>
    )
}
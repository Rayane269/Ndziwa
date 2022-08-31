import React, { 
    createRef, 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from "react"
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Animated, 
    FlatList, 
    TouchableHighlight 
} from "react-native";
import { useSelector, useDispatch } from "react-redux"
import { COLORS, FONTS, SIZES } from "../../../constants";
import { objectIsEmpty } from "../../functions/utils";
import { getCurrentUserAction, getGroupsRelatedAtUserAction } from "../../stores/actions";
import { currentUserSelector, getGroupsRelatedAtUserSelector } from "../../stores/selectors";
import MainLayout from "../MainLayout";


const ShowTontines = ({navigation}) => {

    const scrollX = useRef(new Animated.Value(0)).current
    const tontineTabScrollViewRef = useRef()
	const { user, loading: loadingUser, errors: authenticated} = useSelector(currentUserSelector)
    const dispachUser = useDispatch()
    const {getGroupsRelatedAtUser: groups, loadingGroups: loading, errors: errorsGroup} = useSelector(getGroupsRelatedAtUserSelector)
    const dispatchGroup = useDispatch()

    useEffect(() => {
        dispachUser(() => dispachUser(getCurrentUserAction()))
    }, []) 

    useEffect(() => {
        if (!objectIsEmpty(user)) {
            dispatchGroup(() => 
                getGroupsRelatedAtUserAction(dispatchGroup, user.id)
            )
        }
    }, [user])

    const tontines = groups.length > 0 
        ? groups.map(group => {
            const beneficiaire = group.members.filter(m => m.pivot.rang === group.round).find(() => true)
            
            return {
                id: group.id,
                montant: group.montant.prix,
                state: group.etat.nom,
                title: group.objectif,
                total: group.members.length,
                round: group.round,
                benef: `${beneficiaire?.nom || ''} ${beneficiaire?.prenom || ''}`,
                collecte: beneficiaire?.pivot.date_collecte
            }
        })
        : []

    //console.log('user', user.id)
    //console.log('groups', groups)
    //console.log('tontine', tontines)

    const stateTontine = {
        WAITING: "TontineWaiting",
        PROGRESSING: "TontineInProgress"
    }

    const onglets = [
        {id: 1, title: "En cours"},
        {id: 2, title: "En attente"}
    ]

    const tontineTabs = onglets.map((onglet) => ({
        ...onglet,
        ref: createRef()
    }))

    const RenderHeader = () => {
        return (
            <View style={{
                height: 85,
                backgroundColor: COLORS.green
            }}>
                <Text style={[styles.header_title, {color: COLORS.white, textAlign: "center"}]}>Nouveau projet ?</Text>
                <TouchableOpacity 
                    style={{
                        marginTop: 12,
                        marginHorizontal: 30,
                        backgroundColor: COLORS.blue,
                        paddingVertical: SIZES.base,
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("DefineObjectif")}
                >
                    <Text 
                        style={{
                            textAlign: "center",
                            color: COLORS.white,
                            ...FONTS.h5
                        }}
                    >
                        Vite... créer un mtsango !
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const TabIndicator = ({measureLayout, scrollX}) => {
        const inputRange = tontineTabs.map((_, i) => i * SIZES.width)
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: measureLayout.map(measure => measure.x)
        }) 
        return (
            <Animated.View 
                style={{
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    width: (SIZES.width - (SIZES.padding * 1.3)) / 2,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.hideWhite,
                    transform: [{
                        translateX
                    }]
                }}
            />
        )
    }

    const Onglets = ({scrollX, onTontineTabPress}) => {

        const [measureLayout, setMeasureLayout] = useState([])
        const containerRef = useRef()

        useEffect(() => {
            let ml = []

            tontineTabs.forEach(tontineTab => {
                tontineTab?.ref?.current.measureLayout(
                    containerRef.current,
                    (x, y, width, height) => {
                        ml.push({
                            x, y, width, height
                        })

                        if (ml.length === tontineTabs.length) {
                            setMeasureLayout(ml)
                        }
                    }
                )
            })
        }, [containerRef.current])


        return (
            <View
                ref={containerRef}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}
            >
                {/* TabIndicator */}
                {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}

                {/* Tabs */}
                {tontineTabs.map((item, index) => {
                    return (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => onTontineTabPress(index)}
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                ref={item.ref}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 35,
                                    paddingHorizontal: 15
                                }}
                            >
                                <Text style={{color: COLORS.white, ...FONTS.h5}}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    
                })}
            </View>
        )
    }

    const RenderList = ({}) => {
        
        return (
            <Animated.FlatList
                ref={tontineTabScrollViewRef}
                data={tontineTabs}
                contentContainerStyle={{
                    marginTop: SIZES.padding,
                    marginBottom: 30
                }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={
                    Animated.event([
                        {nativeEvent: {contentOffset: { x: scrollX}}}
                    ], {
                        useNativeDriver: false
                    })
                }
                renderItem={({item, index}) => {
                    let state = item.title === "En cours" ? "progressing" : "waiting"
                    
                    return (
                        <View
                            style={{
                                flex: 1,
                                width: SIZES.width,
                                backgroundColor: COLORS.white,
                                borderTopLeftRadius: SIZES.radius,
                                borderTopRightRadius: SIZES.radius,
                            }}
                        >
                            <FlatList 
                                data={tontines.filter(t => t.state === state)}
                                keyExtractor={item => item.id}
                                renderItem={({item, index}) => {
                                    const tableauType = new Uint16Array(item.total)
                                    const rounds = Array.from(tableauType)
                                    
                                    return (
                                        <View
                                            style={{
                                                marginTop: 10,
                                                marginHorizontal: 8
                                            }}
                                        >
                                            <TouchableHighlight
                                                style={{
                                                    backgroundColor: COLORS.black,
                                                    justifyContent: "center",
                                                    height: 130,
                                                    borderRadius: SIZES.radius,
                                                    paddingHorizontal: 15,
                                                }}
                                                onPress={() => navigation.navigate(stateTontine[item.state.toUpperCase()], {
                                                    group: item.id
                                                })}
                                            >
                                                <View>
                                                    <Text style={{color: COLORS.white, ...FONTS.h4}}>{item.title}</Text>
                                                    <Text style={{fontSize: 12, color: COLORS.white}}>ROUND {`${item.round}/${item.total}`}</Text>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        marginVertical: 5,
                                                    }}>
                                                        {
                                                            rounds.map((r, i) => (<View 
                                                                style={{
                                                                    height: 10,
                                                                    borderTopLeftRadius: i === 0 ? 8 : 0,
                                                                    borderBottomLeftRadius: i === 0 ? 8 : 0,
                                                                    borderTopRightRadius: i === item.total - 1 ? 8 : 0,
                                                                    borderBottomRightRadius: i === item.total - 1 ? 8 : 0,
                                                                    backgroundColor: i < item.round - 1 ? COLORS.blue : COLORS.transparent,
                                                                    width: (SIZES.width - 65) / item.total,
                                                                    marginRight: 2,
                                                                    borderWidth: 1,
                                                                    borderColor: i < item.round - 1 ? COLORS.blue : COLORS.hideWhite
                                                                }}
                                                                key={i}
                                                            ></View>))
                                                        }
                                                    </View>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between"
                                                    }}>
                                                        <Text style={{color: COLORS.white, fontSize: 11, marginVertical: 3}}>Montant à verser {item.montant} KMF</Text>
                                                        <Text style={{fontSize: 12, color: COLORS.gray}}>{item.benef}</Text>
                                                    </View>
                                                    <Text style={{color: COLORS.white, fontSize: 11,}}>Date de collecte {item.collecte} </Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    )
                }}
            />
                
        )
    }

    const handleTontineTabPress = useCallback((tontineTabIndex) => {
        tontineTabScrollViewRef?.current.scrollToOffset({
            offset: tontineTabIndex * SIZES.width
        })

    } ,[])
    

    return (
        <MainLayout
            behavior={Platform.OS === "ios" ? "padding" : null}
            containerStyle={{ flex: 1, marginBottom: 30, backgroundColor: COLORS.black }}
        >
            <RenderHeader user={user} tabScroll />
            
            {/* title */}
            <Text style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    marginHorizontal: 8,
                    marginTop: 15
            }}
            >
                Mes mtsango's
            </Text>

            {/* onglet */}
            <View
                style={{
                    marginTop: 15,
                    marginHorizontal: 5,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.hideWhite,
                }}
            >
                <Onglets scrollX={scrollX} onTontineTabPress={handleTontineTabPress} />
            </View>

            {/* Liste de tontines*/}
            {tontines.length > 0 &&
                <RenderList />
            }
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    header_title: {
        ...FONTS.h3,
    },

    container: {
        marginTop: SIZES.padding * 3,
    }
})

export default ShowTontines
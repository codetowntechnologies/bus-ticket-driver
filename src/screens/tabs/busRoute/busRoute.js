import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Colors, Images } from '../../../theme';
import { CustomSafeArea, Text10, Text14, Loader } from '../../../components';
import MapboxGL from '@react-native-mapbox-gl/maps'
import { currentTripData } from '../../../store/reducerActions/busRoute/busRoute.actions';
import { connect } from 'react-redux';
import styles from './busRoute.styles'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import checkPermission from '../../../utils/checkPermission';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


class BusRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tripData: {}
        }
    }

    componentDidMount() {
        const { currentTripData } = this.props
        currentTripData()
            .then(res => {
                this.setState({ isLoading: false })
                console.log('res', res);
                if (res.payload.data.status == "ok") {
                    this.setState({ tripData: res.payload.data.data })
                } else if (res.payload.data.message) {
                    setTimeout(() => {
                        alert(res.payload.data.message)
                    }, 200);
                }
            })
            .catch(e => this.setState({ isLoading: false }))

        checkPermission((function (val) {

        }))

    }

    render() {
        const { isLoading, tripData } = this.state
        const { navigation } = this.props

        return (
            <View style={styles.mainContainer}>
                <CustomSafeArea />
                <View style={styles.headerView}>
                    <View style={styles.headerContainer}>
                        <Text10 title={tripData.departure_location} type="light" addStyle={styles.cityName} />
                        <View style={styles.logoView}>
                            <Image source={Images.logo} style={styles.logo} resizeMode={'contain'} />
                        </View>

                        <View style={styles.locationView}>
                            <View style={styles.fromLocView}>
                                <Image source={Images.locationBlue} style={styles.locationIcon} resizeMode={'contain'}/>
                                <Text14 title={"From " + tripData.departure_location ? tripData.departure_location : "-"} type="regular" />
                            </View>
                            <View style={styles.toLocView}>
                                <Image source={Images.locationRed} style={styles.locationIcon} resizeMode={'contain'}/>
                                <Text14 title={"To " + tripData.arrival_location ? tripData.arrival_location : "-"} type="regular" />
                            </View>
                            <View style={styles.seperator} />

                            <View style={styles.timeView}>
                                <View style={styles.startTimeView}>
                                    <Text10 title="Start:" type="regular" addStyle={styles.timeTitle} />
                                    <Text14 title={tripData.start ? tripData.start : "-"} type="regular" addStyle={{ color: Colors.brownE1 }} />
                                </View>
                                <View>
                                    <Text10 title="No Bus:" type="regular" addStyle={styles.timeTitle} />
                                    <Text14 title={tripData.bus_number ? tripData.bus_number : "-"} type="regular" addStyle={{ color: Colors.brownE1 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.mapContainer}>
                     <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        region={{
                            latitude: tripData.departure_location_latitude ? parseFloat(tripData.departure_location_latitude) : 37.78825,
                            longitude: tripData.departure_location_longitude ? parseFloat(tripData.departure_location_longitude) : -122.4324,
                            latitudeDelta: 1,
                            longitudeDelta: 0.0421,
                        }}
                    ></MapView>
                    <TouchableOpacity disabled={!(tripData && tripData.arrival_location)} activeOpacity={0.8} style={styles.startTripBtn} onPress={() => { navigation.navigate('tripAnalysis', tripData) }}>
                        {
                            isLoading ?
                                <>
                                    <View />
                                    <ActivityIndicator color={Colors.green27} />
                                </>
                                :
                                <>
                                    <Image source={Images.tiltArrow} style={styles.tiltArrow} />
                                    <Text14 title="Start Trip" type="regular" addStyle={{ color: Colors.whiteFF }} />
                                </>
                        }
                        <View />

                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    currentTripData: () => dispatch(currentTripData())
});

export default connect(null, mapDispatchToProps)(BusRoute);
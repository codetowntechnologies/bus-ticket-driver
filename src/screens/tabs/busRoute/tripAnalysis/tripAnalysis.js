import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps'
import { Colors, AppStyles, Images } from '../../../../theme';
import { Text14, CustomSafeArea, Text12, Text16, Loader } from '../../../../components';
import StepIndicator from 'react-native-step-indicator';
import styles from './tripAnalysis.styles'
import colors from '../../../../theme/colors';
import { changeDriveringStatus, saveDriverLocation } from '../../../../store/reducerActions/busRoute/busRoute.actions';
import { connect } from 'react-redux';

const stepIndicatorStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: Colors.brownE1,
  separatorFinishedColor: Colors.brownE1,
  separatorUnFinishedColor: Colors.brownE1,
  stepIndicatorFinishedColor: Colors.brownE1,
  stepIndicatorUnFinishedColor: Colors.brownE1,
  stepIndicatorCurrentColor: Colors.brownE1,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: Colors.brownE1,
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013',
}

class TripAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavigate: true,
      route:
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  11.953125,
                  39.436192999314095
                ],
                [
                  18.896484375,
                  46.37725420510028
                ]
              ]
            }
          }
        ]
      },
      isLoading: false
    };
  }

  componentDidMount() {
    const { route } = this.state
    const { stoppage_points_list, departure_location_longitude, departure_location_latitude, arrival_location_latitude, arrival_location_longitude } = this.props.route.params

    let coordinates = []
    if (departure_location_longitude && stoppage_points_list) {
      coordinates.push([departure_location_longitude, departure_location_latitude])
      stoppage_points_list.map(item => coordinates.push([item.longitude, item.latitude]))
      coordinates.push([arrival_location_longitude, arrival_location_latitude])
    }
    let newRouteData = route
    newRouteData["features"][0]["geometry"]["coordinates"] = coordinates

    console.log(newRouteData);
    this.setState({ route: newRouteData })
  }

  headerButtonPressed() {
    const { isNavigate } = this.state

    if (isNavigate) {
      this.drivingStatus("start")
    } else {
      this.drivingStatus("stop")
    }
  }

  drivingStatus(status) {
    const { changeDriveringStatus, navigation } = this.props
    const { id } = this.props.route.params

    this.setState({ isLoading: true })
    let data = {
      trip_id: id,
      status: status
    }
    changeDriveringStatus(data)
      .then(res => {
        console.log('res', res);
        this.setState({ isLoading: false })
        if(res.payload.data.status == "ok") {
          if(status == "start") {
            this.setState({ isNavigate: false })
          } else {
            navigation.goBack()
          }
        }
      })
      .catch(e => this.setState({ isLoading: false })
      )
  }

  renderHeader() {
    const { isNavigate } = this.state
    const { navigation } = this.props
    const { departure_location } = this.props.route.params

    return (
      <View style={styles.headerContainer}>
        <CustomSafeArea backgroundColor="transparent" />
        {
          isNavigate ?
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
              <Image source={Images.backBlack} style={styles.backImage} resizeMode={'contain'} />
            </TouchableOpacity>
            :
            <View style={styles.emptyView} />

        }

        <TouchableOpacity disabled={!departure_location} activeOpacity={0.8} style={[styles.startTripBtn, { backgroundColor: isNavigate ? Colors.blue57 : colors.redD0 }]} onPress={() => { this.headerButtonPressed() }}>
          <Image source={Images.arrow} style={styles.tiltArrow} />
          <Text14 title={isNavigate ? "Navigate" : "End Trip"} type="regular" addStyle={{ color: Colors.whiteFF }} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { departure_location, arrival_location, stoppage_points_list, bus_operator, trip_route_name, start, departure_location_longitude, departure_location_latitude } = this.props.route.params
    const { isLoading } = this.state
    let labels = []
    if (departure_location && stoppage_points_list) {
      labels.push(departure_location)
      stoppage_points_list.map(item => labels.push(item.title.substr(0, 40)))
      labels.push(arrival_location)
    }

    return (
      <View style={styles.mainContainer}>
        <Loader isLoading={isLoading}/>
        <MapboxGL.MapView
          style={styles.mainContainer}
          logoEnabled={false}
          animated={true}
        >
          {/* <MapboxGL.Camera
            zoomLevel={10}
            followUserMode="normal"
            centerCoordinate={[parseFloat(departure_location_longitude), parseFloat(departure_location_latitude)]}
          />

          <MapboxGL.ShapeSource id='line1' shape={this.state.route}>
            <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'blue' }} />
          </MapboxGL.ShapeSource> */}


        </MapboxGL.MapView>
        {this.renderHeader()}


        <View style={styles.bottomContainer}>
          {
            bus_operator ?
            <>
              <View style={[AppStyles.shadow, styles.routeDetail]}>
                <View style={styles.busNumberView}>
                  <Text12 title={bus_operator} type="regular" addStyle={{ color: Colors.whiteFF }} />
                </View>
                <View style={{ }}>
                  <Text14 title={trip_route_name} type="regular" />
                  <Text12 title={start} type="regular" addStyle={styles.startTime} />
                </View>
              </View>

              <StepIndicator
                customStyles={stepIndicatorStyles}
                currentPosition={2}
                stepCount={labels.length}
                labels={labels}
                direction="vertical"
                renderStepIndicator={(item, index) => {
                  if (item.position == labels.length - 1) {
                    return (
                      <View style={styles.stepIndicator0}>
                        <View style={styles.innerIndicatorView}></View>
                      </View>
                    )
                  }
                  return (
                    <View style={styles.stepIndicator}>
                      <View style={{ height: 12, width: 12, borderRadius: 12 / 2, backgroundColor: item.position == 0 ? Colors.brownE1 : Colors.whiteFF }}></View>
                    </View>
                  )
                }}
              />
            </>
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text16 title={"No Trip data found"} type="regular"/>
            </View>
          }
        </View>
      </View>

    );
  }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
  changeDriveringStatus: (data) => dispatch(changeDriveringStatus(data)),
  saveDriverLocation: (data) => dispatch(saveDriverLocation(data))
});

export default connect(null, mapDispatchToProps)(TripAnalysis);
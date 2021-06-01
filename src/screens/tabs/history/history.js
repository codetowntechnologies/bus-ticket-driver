import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Header, Text12 } from '../../../components';
import { Colors, AppStyles } from '../../../theme';
import { FlatList } from 'react-native-gesture-handler';
import styles from './history.styles';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={"List Trip"} />
                <FlatList
                    data={[{ from: "Stasiun Cikarang", to: "Hollywood Jc", time: "13:05", date: "02/0720", day: "Thu", busNo: "2A" }]}
                    keyExtractor={(item, index) => `${index.toString()}`}
                    style={{ marginTop: 10 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[AppStyles.shadow, styles.listView]}>
                                <View style={styles.busNoView}>
                                    <Text12 type="regularWhite" title={item.busNo} />
                                </View>
                                <View style={styles.rightView}>
                                    <View style={styles.rightTopView}>
                                        <View style={styles.originView}>
                                            <Text12 type="light" title={item.from + " - "} />
                                            <Text12 type="light" title={item.to} />
                                        </View>
                                        <View style={styles.timeView}>
                                            <Text12 type="regularWhite" title={item.time} />
                                        </View>
                                    </View>
                                    <View style={styles.seperatorLine} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Text12 type="regularWhite" title={item.day + ","} addStyle={{ color: Colors.brownE1 }} />
                                        <Text12 type="regularWhite" title={item.date} addStyle={{ color: Colors.brownE1 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}
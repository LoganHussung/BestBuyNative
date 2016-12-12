
import React, { Component } from 'react';
import { ScrollView, Alert, StyleSheet, AppRegistry,Text, TextInput, ListView, View, Image } from 'react-native';
import axios from 'axios';
import styles from './styles';
import api from './api';

export default class BestBuyNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      text: '',
    }
  }

  componentDidMount() {
    this.getInitialData()
  }

  getInitialData() {
    axios.get(api() + '/stores')
      .then((response) => {
        let stores = response.data.data.slice(0);
        this.setState({
          stores: stores,
        })
      })
      .catch(function (error) {
      });
  }

  getStoresRows() {
    var storeData = this.storesDataSource();
    return storeData.cloneWithRows(this.state.stores);
  }

  storesDataSource() {
    return new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Best_Buy_Corporate_Campus.jpg'
    };
    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop:35,
            alignItems:'center'
          }}>
            <Text style={styles.title}>Best Buy Me</Text>
            <Image source={pic} style={{width: 350, height: 210}}/>
        </View>
        <ListView
            style={{margin:20}}
            enableEmptySections={true}
            dataSource={this.getStoresRows()}
            renderRow={(rowData)=>
                <View
                  style={{flex: 1 , flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Text style={styles.store}>{rowData.name}</Text>
                    <Text style={styles.Address}>{rowData.address}</Text>
                    <Text style={styles.Address}>{rowData.city}, {rowData.state}, {rowData.zip}</Text>
                </View>
            }/>
        </View>
    );
  }
}

AppRegistry.registerComponent('BestBuyNative', () => BestBuyNative);

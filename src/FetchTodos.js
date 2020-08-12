import React, { Component } from 'react';
import { Text, View, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../Database';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

//Month names
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//date formation
let date = new Date()
let year = date.getFullYear()
let day = ("0" + date.getDate()).slice(-2)
let month = ("0" + (date.getMonth() + 1)).slice(-2)
let monthname = monthNames[date.getMonth()]
let curr_date = `${day}-${month}-${year}`;
let tasks = [];


export default class FetchTodos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    componentDidMount = () => {
        firebase.database().ref(`Notes/${year}/${monthname}/12-08-2020`).once('value', data => {
            let result = data.val();
            setTimeout(() => {
                console.log(result)
                this.setState({ tasks: result })
            }, 1500)
        })
    }

    FetchTodos = () => {

    }

    handleDel = (item) => {
        console.log(item)
        console.log(tasks)
    }

    render() {
        tasks = [];

        Object.entries(this.state.tasks).forEach(([key, val]) => {
            tasks.push(
                <ListItem
                    key={key}
                    title={val}
                    rightIcon={<Icon name="trash" size={20} color='#e74c3c' onPress={this.handleDel.bind(tasks)} ></Icon>}
                    bottomDivider
                />
            )
        })
        return (
            <View>
                {this.state.tasks.length == 0 ?
                    <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" />
                  </View>
                    :
                    tasks
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  
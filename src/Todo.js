import React, { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from '../Database';
import FetchTodos from './FetchTodos'
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
let note_id;

const Todo = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("")

    useEffect(() => {
        
    },[]);

    function Open() {
        navigation.openDrawer();
        // ,onPress: Open()
    }

    let Upload_Db = () => {

        firebase.database().ref(`Notes/${year}/${monthname}/${curr_date}`).once('value', data => {
            let result = data.val();
            console.log(result)
            if (result == null) {
                note_id = 1;
            }
            else {
                note_id = Object.keys(result).length + 1;
            }
        }).then(() => {
            console.log(note_id)
            firebase.database().ref(`Notes/${year}/${monthname}/${curr_date}`).update({
                [note_id]: task,
            }).then(() => {
                setTask("")
            })
        })


    }

    return (
        <ScrollView>
            <Header
                backgroundColor='#227093'
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'My Notes', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View style={styles.input_view}>
                <Input
                    placeholder='Add a new Task'
                    value={task}
                    onChangeText={(text) => setTask(text)}
                    rightIcon={{ type: 'font-awesome', name: 'plus-circle', color: '#227093', onPress: () => Upload_Db() }}
                />
            </View>
            <View style={styles.main_view}>
                <FetchTodos />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input_view: {
        marginRight: 6,
        marginLeft: 6,
        marginTop: 10,
        backgroundColor: '#ffffff'
    },
    main_view: {
        marginRight: 6,
        marginLeft: 6,
        marginBottom: 5,
        backgroundColor: '#ffffff'
    }
})

export const Drawer = createDrawerNavigator();
export default Todo;
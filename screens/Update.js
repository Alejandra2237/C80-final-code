import React, { Component } from "react";
import {Text, View, ImageBackground, StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';
import axios from "axios";

export default class UpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            reports: [],
            blogs: []
        };
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles = () => {
        axios
        .get("https://api.spaceflightnewsapi.net/v4/articles/")
        .then(response => {
            this.setState({ articles: response.data })
            this.getReports()
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }
    getReports = () => {
        axios
        .get("https://api.spaceflightnewsapi.net/v4/reports")
        .then(response => {
            this.setState({ reports: response.data })
            this.getBlogs()
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }
    getBlogs = () => {
        axios
        .get("https://api.spaceflightnewsapi.net/v4/blogs")
        .then(response => {
            this.setState({ blogs: response.data })
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }
    
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require('../assets/bg_updates.jpg')} style={styles.backgroundImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>Pantalla de Actualizaciones</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    titleBar: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
})


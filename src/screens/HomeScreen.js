import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import { Link } from 'react-router-dom';

const Home = ({navigation}) => {
    return (
        <div style={{height: "100vh", width: "100vw", backgroundColor:"#e8e8e8"}}>
            <View style={styles.container}>
                <Text style={styles.header}>Welcome to SCTAT</Text>
                <View style={styles.buttonContainer}>
                        {/* <Link style={{textAlign: "center", textDecoration: "none"}} to='/classinfo'>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Create New Observation</Text>
                            </View>
                        </Link> */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ClassInfoInput')}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Create New Observation</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "5%",
        backgroundColor: "#d8d8d8",
        height: "100vp",
    },
    header: {
        alignSelf: "center",
        fontSize: "30px",
        marginBottom: "30px",
        marginTop: '1%',
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom: "3%",
    },
    button: {
        alignSelf: "center",
        width: 200,
        height: 50,
        backgroundColor: "blue",
        borderRadius: "5%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        alignSelf: 'center',
        textAlign: "center",
        fontWeight: 'bold'
    },
    link: {
        alignItems: "center"
    }
});

export default Home;
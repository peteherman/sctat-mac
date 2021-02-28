import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Link } from 'react-router-dom';

const LinkButton = ({toLink, linkText, parStyles}) => {
    return (
        <View style={[styles.buttonContainer, parStyles.buttonContainer]}>
                <View style={[parStyles, styles.button]}>
                    <Link style={{textAlign: "center", textDecoration: "none"}} to={toLink}><Text style={[parStyles, styles.buttonText]}>{linkText}</Text></Link>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center"
    },
    button: {
        alignSelf: "center",
        width: 200,
        height: 50,
        backgroundColor: "blue",
        borderRadius: "5%"
    },
    buttonText: {
        flex: 1,
        fontSize: 20,
        color: "white",
        alignSelf: 'center',
        textAlign: "center",
        textAlignVertical: 'center'
    },
    link: {
        alignItems: "center",
    }
});
export default LinkButton;



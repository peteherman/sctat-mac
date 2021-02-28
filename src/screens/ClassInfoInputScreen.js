import React, {useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Select from 'react-select';
// import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import {Context} from '../context/ClassTimeContext';

import {Picker} from '@react-native-picker/picker';

const ClassInfoInput = ({navigation}) => {
    

    const [timeselect, setTimeSelect] = useState('pm');
    const [className, setClassName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [classSize, setClassSize] = useState('');
    const [startTime, setStartTime] = useState('');
    const [allottedTimeMin, setAllottedTimeMin] = useState('');
    const [observerName, setObserverName] = useState('');
    const [errMsg, setErrMsg] = useState('');

    var timeselectHTML;
    
    // let webHistory = useHistory();

    const verifyInput = () => {
        if (className.length <= 0) {
            setErrMsg("Please enter a class name");
            return false;
        } else if (teacherName.length <= 0) {
            setErrMsg("Please enter a teacher name");
            return false;
        } else if (allottedTimeMin.length <= 0 || parseInt(allottedTimeMin) <= 0) {
            setErrMsg("Please enter an allotted time > 0");
            return false;
        } else if (observerName.length <= 0) {
            setErrMsg("Please enter an observer name");
            return false;
 
        } else if (classSize.length <= 0 || parseInt(classSize) <= 0) {
            setErrMsg("Please enter a class size > 0");
            return false;
        } else if (startTime.length <= 0) {
            setErrMsg("Please enter a start time");
            return false;
        } else {
            return true;
        }
    }

    return (
        <div style={{height: "100vh", width: "100vw", backgroundColor:"#e8e8e8"}}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Please Describe Your Observation</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.errMsg}>{errMsg}</Text>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Class Name:</Text>
                    <TextInput
                        style={styles.fieldInput} 
                        value={className} 
                        placeholder="Class Name"
                        onChangeText={(newValue)=> setClassName(newValue)}
                    ></TextInput>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Teacher Name:</Text>
                    <TextInput 
                        style={styles.fieldInput}
                        autoCorrect={false} 
                        placeholder="Teacher Name"
                        value={teacherName}
                        onChangeText={(newValue) => setTeacherName(newValue)}
                    ></TextInput>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Allotted Time (Min):</Text>
                    <TextInput 
                        style={styles.fieldInput}
                        placeholder="0"
                        value={allottedTimeMin}
                        onChangeText={(newValue) => {
                            if (isNaN(newValue)) {
                                return;
                            }
                            setAllottedTimeMin(newValue)
                        }}
                    ></TextInput>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Observer:</Text>
                    <TextInput 
                        style={styles.fieldInput}
                        value={observerName}
                        onChangeText={(newName) => setObserverName(newName)}
                        autoCorrect={false} 
                        placeholder="Observer"
                    ></TextInput>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Class Size:</Text>
                    <TextInput 
                        value={classSize}
                        style={styles.fieldInput}
                        onChangeText={(newSize) => {
                            if (isNaN(newSize)) {
                                return;
                            }
                            setClassSize(newSize)
                        }}
                        placeholder="e.g 35"
                    ></TextInput>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Start Time:</Text>
                    <TextInput 
                        style={styles.fieldInput}
                        value={startTime}
                        onChangeText={(newTime) => setStartTime(newTime)}
                        placeholder="HH:MM"
                    ></TextInput>
                </View>
                <View style={styles.buttonFooter}>
                    <View style={styles.buttonWrapper}>
                        <View style={[styles.buttonContainer]}>
                                <TouchableOpacity
                                    style={styles.link}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}>
                                         <View style={[styles.button]}>
                                            <Text style={[styles.buttonText]}>Back</Text>
                                         </View>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View >
                                {/* <Link onClick={(event) => {
                                    
                                    // clear the current error message
                                    setErrMsg('');

                                    if (!verifyInput()) {
                                        event.preventDefault();
                                    } 
                                }} to={{
                                    
                                    pathname: "/classtimer",
                                    state: {
                                        observer: observerName,
                                        teacher: teacherName,
                                        classSize: classSize,
                                        allottedTime: allottedTimeMin,
                                        startTime: startTime,
                                        className: className,
                                    }
                                }} style={{textDecoration: 'none'}}>
                            */} 
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (verifyInput()) {
                                                navigation.navigate('ClassTimer', {
                                                    classInfo: {

                                                        observer: observerName,
                                                        teacher: teacherName,
                                                        classSize: classSize,
                                                        allottedTime: allottedTimeMin,
                                                        startTime: startTime,
                                                        className: className,
                                                    }
                                                })
                                            }   
                                        }
                                    }>
                                        <View style={styles.button}>
                                            <Text style={{fontSize: '20px', textDecoration: 'none'}}>Begin Class Time Analysis</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View> 
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        marginTop: '5%',
        borderRadius: '5px',
    },
    fieldContainer: {
        flexDirection: 'row',
        marginBottom: "10px",
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    formContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: '#cfcfcf',
        marginLeft: "10%",
        marginRight: "10%",
        paddingTop: '2%',
        width: "60%",
        borderRadius: '10px'
    },
    headerContainer: {
        alignItems: 'center',
        flex: 1,
        marginBottom: '5px',
    },  
    header: {
        fontSize: '30px',
        fontWeight: 'bold',
    },  

    fieldLabel: {
        fontSize: "20px",
        marginRight: "20px",
        marginLeft: "10px",
        fontWeight: 'bold',
        width: '50%',
        textAlign: 'right',
    },

    fieldInput: {
        marginRight: '5%',
        width: '50%',
        fontSize: '15px',
        alignSelf: 'flex-end',
        height: '30px',
        backgroundColor: "#FFF",
        borderColor: 'e8e8e8',
        borderWidth: '1px',
        paddingLeft: '5px',
    },

    buttonFooter: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
        paddingBottom: '5px',
        justifyContent: 'center',
    },
    buttonContainer: {
        textAlign: 'center',
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#a8a8a8',
        borderRadius: '5px',
        borderColor: 'black',
        borderWidth: '1px',
        textAlignVertical: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        height: '35px',
        borderRadius: '5px',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        flex: 1,
        // textAlignVertical: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: '20px',
    },
    errMsg: {
        fontSize: '20px',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: '.5%',
        color: 'red',
    }

});

export default ClassInfoInput;
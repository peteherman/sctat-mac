import React, { Component, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
// import { Link } from 'react-router-dom';
import { Picker } from '@react-native-picker/picker';
import TimeSlice from '../components/TimeSlice';
import ReactModal from 'react-modal';
import autosize from 'autosize';

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);

class ClassTimer extends Component {

    textAreaRef = React.createRef();

    componentDidMount() {
        autosize(this.textAreaRef);
    }

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.previousState = props.navigation.getParam('classInfo');
        console.log(this.previousState);
        this.categories = [ 'Assessment of Student Learning', 'Student Work Time', 'Teacher-Led Time', 'Transitions'];

        this.categoryMap = { 
            'Assessment of Student Learning' : ['Oral Assessment of Student Learning', 'Written Assessment of Student Learning'],
            'Student Work Time' : ['Small Group Discussion/Activity', 'Independent Practice/Activity', 'Combined Practices'],
            'Teacher-Led Time' : ['Welcome / Lesson Launch', 'Teacher-Directed Instruction', 'Whole-Class Discussion / activity'],
            'Transitions' : ['Arrival Routine', 'Transition to Next Component', 'Dismissal Routine', 'Unplanned Interruption']
        }

        this.state = {
            hr: 0,
            min: 0,
            sec: 0,
            timeSlices: [],
            notes: "",
            confirmFinishVisible: false,
            category: this.categories[0],
            subcategories: this.categoryMap[this.categories[0]],
            selectedSubCategory: this.categoryMap[this.categories[0]][0]
        }

        this.sliceStart = {
            hr: 0,
            min: 0,
            sec: 0
        }

        this.sliceEnd = {
            hr: 0,
            min: 0,
            sec: 0
        }


        this.startSlice();
        this.startTimer();
        this.noteBox = undefined;
        this.running = true;
    }
    

    

    startTimer() {
        if (this.running) {
            return;
        }
        this.timerInterval = setInterval(() => {
            if (this.state.sec !== 59) {
                this.setState({
                    sec: this.state.sec+1
                })
            } else if (this.state.min !== 59) {
                this.setState({
                    sec: 0,
                    min: this.state.min+1
                });
            } else {
                this.setState({
                    sec: 0,
                    min: 0,
                    hr: this.state.hr+1
                });
            }
        }, 1000);
        this.running = true;
    } 

    pauseTimer() {
        clearInterval(this.timerInterval);
        this.running = false;
    }

    startSlice() {
        this.sliceStart = {
            hr: this.state.hr,
            min: this.state.min,
            sec: this.state.sec,
            category: "test Category",
            subcategory: "test subcategory",
        }
        this.startDateTime = new Date();
        this.startDateTime.setHours(this.sliceStart.hr);
        this.startDateTime.setMinutes(this.sliceStart.min);
        this.startDateTime.setSeconds(this.sliceStart.sec);
    }

    endSlice() {
        this.sliceEnd = {
            hr: this.state.hr,
            min: this.state.min,
            sec: this.state.sec
        }
        this.endDateTime = new Date();
        this.endDateTime.setHours(this.sliceEnd.hr);
        this.endDateTime.setMinutes(this.sliceEnd.min);
        this.endDateTime.setSeconds(this.sliceEnd.sec);
        return this.endDateTime;
    }

    generateTimeSlice() {
        // Get difference in time in milliseconds
        var timeSliceDurationMs = (this.endDateTime - this.startDateTime > 0) ? this.endDateTime - this.startDateTime : 0 ;
        var workingDuration = timeSliceDurationMs;

        // Generate a timesliceduration object
        var hr = Math.floor(timeSliceDurationMs / (3600 * 1000));
        workingDuration -= hr * (3600 * 1000);
        
        var min = Math.floor(workingDuration / (60 * 1000));
        workingDuration -= min * (60 * 1000);

        var sec = Math.round(workingDuration / (1000), 2);

        return {
            hr: hr,
            min: min,
            sec: sec,
            category: this.state.category,
            subcategory: this.state.selectedSubCategory,
            notes: this.state.notes.trim()
        }
    }

    handlePress() {
        // Need to end the current time slice
        this.endSlice();
        
        // Need to generate a timeslice using starting slice, ending slice, and category/subcategory (in slicestart)
        const newTimeSlice = this.generateTimeSlice();

        // start a new time slice
        this.startSlice();
        
        // Add this time slice to state's timeSlices so page will be rerendered with new info
        this.setState({
            notes: "",
            timeSlices: [...this.state.timeSlices, newTimeSlice]
        });

        // Clear the text from the note box
        // this.noteBox.value = "";
        
    }

    setConfirmFinishModalVisible = (visible) => {
        this.setState({ confirmFinishVisible: visible});
    }

    render() {
        return (
            <div style={{height: "100vh", width: "100vw", backgroundColor:"#e8e8e8"}}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.timerInputContainer}>
                        <View style={styles.fieldContainer}>
                            <View style={styles.fieldLabelContainer}>
                                <Text style={styles.fieldLabel}>Category:</Text>
                            </View>
                                <Picker
                                    selectedValue={this.state.category}
                                    onValueChange={(itemValue, index) => {
                                        this.setState({ category: itemValue, selectedSubCategory: this.categoryMap[itemValue][0] });
                                        // this.handlePress();
                                    }}>
                                    <Picker.Item label={this.categories[0]} value={this.categories[0]}></Picker.Item>
                                    <Picker.Item label={this.categories[1]} value={this.categories[1]}></Picker.Item>
                                    <Picker.Item label={this.categories[2]} value={this.categories[2]}></Picker.Item>
                                    <Picker.Item label={this.categories[3]} value={this.categories[3]}></Picker.Item>
                                </Picker>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.fieldLabelContainer}>
                                <Text style={styles.fieldLabel}>Subcategory:</Text>
                            </View>
                            <Picker
                                selectedValue={this.state.selectedSubCategory}
                                onValueChange={(itemValue, index) => {
                                    this.setState({ selectedSubCategory: itemValue, subcategory: this.categoryMap[itemValue] });
                                    // this.handlePress();
                                }}
                            >

                                { this.state.category == this.categories[0] ? 
                                    [
                                        <Picker.Item label={this.categoryMap[this.state.category][0]} value={this.categoryMap[this.state.category][0]}/>,
                                        <Picker.Item label={this.categoryMap[this.state.category][1]} value={this.categoryMap[this.state.category][1]}/>
                                    ]
                                : this.state.category == this.categories[1] ?
                                    [
                                        <Picker.Item label={this.categoryMap[this.state.category][0]} value={this.categoryMap[this.state.category][0]}/>,
                                        <Picker.Item label={this.categoryMap[this.state.category][1]} value={this.categoryMap[this.state.category][1]}/>,
                                        <Picker.Item label={this.categoryMap[this.state.category][2]} value={this.categoryMap[this.state.category][2]}/>,
                                    ]
                                : this.state.category == this.categories[2] ?
                                [
                                    <Picker.Item label={this.categoryMap[this.state.category][0]} value={this.categoryMap[this.state.category][0]}/>,
                                    <Picker.Item label={this.categoryMap[this.state.category][1]} value={this.categoryMap[this.state.category][1]}/>,
                                    <Picker.Item label={this.categoryMap[this.state.category][2]} value={this.categoryMap[this.state.category][2]}/>,
                                ]
                                :
                                [
                                    <Picker.Item label={this.categoryMap[this.state.category][0]} value={this.categoryMap[this.state.category][0]}/>,
                                    <Picker.Item label={this.categoryMap[this.state.category][1]} value={this.categoryMap[this.state.category][1]}/>,
                                    <Picker.Item label={this.categoryMap[this.state.category][2]} value={this.categoryMap[this.state.category][2]}/>,
                                    <Picker.Item label={this.categoryMap[this.state.category][3]} value={this.categoryMap[this.state.category][3]}/>,
                                ]
                                }

                            </Picker>
                        </View>
                        <View style={styles.fieldContainer}>
                            <View style={styles.fieldLabelContainer}>
                                <Text style={styles.fieldLabel}>Notes:</Text>
                            </View>
                            {/* <TextareaAutosize 
                                ref={(ref) => this.noteBox = ref}
                                minRows={3}
                                value={this.state.notes}
                                style={{width: '50%'}}
                                onChange={(event)=> this.setState({...this.state, notes: event.target.value})}
                            /> */}
                            {/* <TextInput
                                onChangeText={(newText) => this.setState({...this.state, notes: newText})}
                            /> */}
                            {/* <input  
                                type="textarea"
                                rows={5}
                                value={this.state.notes}
                                onChange={(event) => this.setState({...this.state, notes:event.target.value})}
                            /> */}
                            <textarea
                                ref={this.textAreaRef}
                                placeholder="Notes:"
                                rows={5}
                                value={this.state.notes}
                                onChange={(event) => this.setState({...this.state, notes: event.target.value})}
                            />
                        </View>
                        <View style={[styles.buttonContainer]}>
                            <TouchableOpacity 
                                onPress={()=> this.handlePress()}
                            >
                                <View style={[styles.button, { marginRight: '40%'}]}>
                                    <Text>Next Activity</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.pauseTimer();
                                    this.setConfirmFinishModalVisible(true);
                                }}
                            >
                                <View style={styles.button}>
                                    <Text>End Class</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.timerAndSliceContainer}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoLabel}>Class Name:</Text>
                                <Text style={styles.infoText}>{this.previousState.className}</Text>                              
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.infoLabel}>Observer Name:</Text>
                                <Text style={styles.infoText}>{this.previousState.observer}</Text>
                            </View>
                            <View style={styles.timerContainer}>
                                <Text style={[styles.timerText, styles.timerLabelText]}>Elapsed Time:</Text>
                                <View stle={styles.timerTextContainer}>
                                    <Text style={[styles.timerText]}>{padToTwo(this.state.hr)}:{padToTwo(this.state.min)}:{padToTwo(this.state.sec)}</Text>
                                </View>
                            </View>
                            <View style={styles.timesliceContainer}>
                                <FlatList
                                        data={this.state.timeSlices}
                                        keyExtractor={(item, index) => `${index}`}
                                        renderItem={({ item, index, separator}) => (
                                            <TimeSlice
                                                timeslice={this.state.timeSlices[index]}
                                                showNotes={false}
                                                showSubcategory={true}
                                            />
                                        )}
                                />
                            </View>
                    </View>

                </View>
                    <ReactModal
                        animationType="none"
                        transparent={true}
                        isOpen={this.state.confirmFinishVisible}
                        onRequestClose={()=> {
                            this.startTimer();
                            this.setConfirmFinishModalVisible(false);
                        }}
                    >
                        <View style={styles.confirmModal}>
                            <View style={styles.modalHeaderContainer}>
                                <Text style={styles.modalHeader}>Are you sure you want to end this class?</Text>
                            </View>
                            <View style={styles.modalButtonContainer}>
                                {/* <Link style= {{ textDecoration: 'none' }} to={{
                                    pathname: '/editanalysis',
                                    state: {
                                        classInfo: this.previousState,
                                        timeSlices: this.state.timeSlices
                                    }}}
                                >
                                    <View style={[styles.modalButton, {marginRight: '30px'}]}>
                                        <Text style={styles.modalButtonText}>Yes</Text>
                                    </View>
                                </Link> */}
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.setConfirmFinishModalVisible(false);
                                        this.navigation.navigate('EditAnalysis', {
                                            timeSlices: this.state.timeSlices,
                                            classInfo: this.previousState,
                                        })
                                    }}
                                ><View style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </View></TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.startTimer();
                                        this.setConfirmFinishModalVisible(false);
                                    }}
                                >
                                    <View style={styles.modalButton}>
                                        <Text style={styles.modalButtonText}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ReactModal>
        
                </View>
                
            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100vw',
        height: '100vh',
    },
    contentContainer: {
        marginTop: '3%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },  
    timerInputContainer: {
        width: '60%',
        paddingLeft: '5%',
        marginTop:'2%',
        // backgroundColor: 'yellow',
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: '2%',
    },
    fieldLabelContainer: {
        width: '30%',
        // alignItems: 'center',
    },  
    fieldLabel: {
        textAlign: "right",
        marginRight: '5px',
    },
    timerAndSliceContainer: {
        width: '40%',
        paddingRight: '5%',
        marginTop: '1%',
    },
    timerContainer: {
        // flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'grey',
        paddingRight: '5%',
        borderColor: 'black',
        borderWidth: '1px',
    },
    timerLabelText: {
        width: '50%',
        marginRight: "3%",
        textAlign: 'center',
    },
    timerTextContainer: {
        width: '50%',
        flexDirection: 'row',
    },
    timerText: {
        fontSize: '20px',
        color: "black",
    },

    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        marginTop: '5%',
        paddingLeft: '10%',
    },
    button: {
        alignSelf: 'center',
        height: '30px',
        width: '200px',
        backgroundColor: '#a8a8a8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        borderColor: 'black',
        borderWidth: '1px',
    },
    modalHeaderContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    modalHeader: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
    },
    modalButton: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        borderRadius: '5px',
        borderColor: 'black',
        borderWidth: '1px',
        padding: '30px',
        fontSize: '30px',
    },
    modalButtonText: {
        fontSize: '30px',
        // textDecoration: 'none',
        textDecorationStyle: 'none',
        textDecoration: 'none',
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#e8e8e8'
    },
    infoLabel: {
        flex: 1,
        paddingRight: '5px',
        textAlign: 'right',
        fontSize: '20px',
    },
    infoText: {
        flex: 1,
        paddingLeft: '5px',
        textAlign: 'left',
        fontSize: '20px',
    }
});
export default ClassTimer;
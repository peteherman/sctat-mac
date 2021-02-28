import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Link, withRouter } from 'react-router-dom';

import EditSlice from '../components/EditSlice';

class EditAnalysis extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.classInfo = props.navigation.getParam('classInfo');
        this.timeSlices = props.navigation.getParam('timeSlices');
        this.testData = "test data"
        this.state = {
            timeSlices: props.navigation.getParam('timeSlices'),
            testCategory: "first"
        }
        this.setCategory = this.setCategory.bind(this);
        this.setSubcategory = this.setSubcategory.bind(this);
        this.setNotes = this.setNotes.bind(this);
    }

    setCategory(index, category) {
        var slices = [...this.state.timeSlices];
        var slice = slices[index];
        slice.category = category;
        slices[index] = slice;
        this.setState({timeSlices: slices})
        // console.log(this.testData)
    }

    setSubcategory(index, subcategory) {
        var slices = [...this.state.timeSlices];
        var slice = slices[index];
        slice.subcategory = subcategory;
        slices[index] = slice;
        this.setState({timeSlices: slices})
    }

    setNotes(index, notes) {
        var slices = [...this.state.timeSlices];
        var slice = slices[index];
        slice.notes = notes;
        slices[index] = slice;
        this.setState({timeSlices: slices})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Edit Analysis</Text>
                {/* <Link  style= {{ textDecoration: 'none', alignSelf: 'center', marginVertical: '30px' }}
                        to={{
                            pathname: '/results',
                            state: {
                                classInfo: this.classInfo,
                                timeSlices: this.state.timeSlices
                            }
                        }}
                    ><View style={[styles.buttonContainer, {marginVertical: '1%'}]}><Text style={styles.buttonText}>Complete Editing</Text></View></Link> */}
                <TouchableOpacity
                    onPress={() => {
                        this.navigation.navigate('Results', {
                            classInfo: this.classInfo,
                            timeSlices: this.state.timeSlices
                        })
                    }}
                ><View style={[styles.buttonContainer, {marginVertical: '1%'}]}><Text style={styles.buttonText}>Complete Editing</Text></View>
                </TouchableOpacity>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    data={this.state.timeSlices}
                    renderItem={({item, index, separator}) => (
                        <EditSlice
                            timeSlice={this.state.timeSlices[index]}
                            categoryUpdater={this.setCategory}
                            subcategoryUpdater={this.setSubcategory}
                            notesUpdater={this.setNotes}
                            index={index}
                        />
                    )}    
                />
                    {/* <Link  style= {{ textDecoration: 'none', alignSelf: 'center'}}
                        to={{
                            pathname: '/results',
                            state: {
                                classInfo: this.classInfo,
                                timeSlices: this.state.timeSlices
                            }
                        }}
                    ><View style={styles.buttonContainer}><Text style={styles.buttonText}>Complete Editing</Text></View></Link> */}
                    <TouchableOpacity
                    onPress={() => {
                        this.navigation.navigate('Results', {
                            classInfo: this.classInfo,
                            timeSlices: this.state.timeSlices
                        })
                    }}
                    ><View style={[styles.buttonContainer, {marginVertical: '1%'}]}><Text style={styles.buttonText}>Complete Editing</Text></View>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#e8e8e8',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        marginTop: '3%',
        fontSize: '35px',
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '150px',
        height: '50px',
        backgroundColor: '#a8a8a8',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    editList: {
        alignSelf: 'center',
        width: '30%',
    },
    buttonLink: {
        alignSelf: 'center',
    }
});

export default EditAnalysis;
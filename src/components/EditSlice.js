import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { categories, getCategoryColor, categoryMap } from '../static_data/category-data';
import autosize from 'autosize';

class EditSlice extends Component {
    constructor(props) {
        super(props);

        this.timeSlice = props.timeSlice;
        this.timeSliceIndex = props.index;

        this.state = {
            category: this.timeSlice.category,
            selectedSubcategory: this.timeSlice.subcategory,
            notes: this.timeSlice.notes
        }

    }

    render() {
        const styles = StyleSheet.create({
            container: {
                backgroundColor: getCategoryColor(this.state.category),
                width: '30%',
                alignSelf: 'center',
                marginBottom: '1%',
                padding: '1%',
                borderRadius: '10px',
            },  
            headerContainer: {
                flexDirection: 'row',
            },
            fieldTitle: {
                fontSize: '20px',
                marginRight: '2%',
                marginBottom: '.5%',
            },
            fieldText: {
                fontSize: '20px',
            }
        
        });

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.fieldTitle}>Duration:</Text>
                    <Text style={styles.fieldText}>{this.timeSlice.hr}:{this.timeSlice.min}:{this.timeSlice.sec}</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.fieldTitle}>Category:</Text>
                    <Picker 
                        selectedValue={this.state.category}
                        onValueChange={(newValue) => {
                            this.props.categoryUpdater(this.timeSliceIndex, newValue);
                            this.setState({category: newValue});
                        }}
                    >
                        <Picker.Item label={categories[0]} value={categories[0]}></Picker.Item>
                        <Picker.Item label={categories[1]} value={categories[1]}></Picker.Item>
                        <Picker.Item label={categories[2]} value={categories[2]}></Picker.Item>
                        <Picker.Item label={categories[3]} value={categories[3]}></Picker.Item>
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.fieldTitle}>Subcategory:</Text>
                    <Picker 
                        selectedValue={this.state.selectedSubcategory}
                        onValueChange={(newValue) => {
                            this.props.subcategoryUpdater(this.timeSliceIndex, newValue);
                            this.setState({selectedSubcategory: newValue});
                        }}
                    >
                        { this.state.category == categories[0] ? 
                                    [
                                        <Picker.Item label={categoryMap[this.state.category][0]} value={categoryMap[this.state.category][0]}/>,
                                        <Picker.Item label={categoryMap[this.state.category][1]} value={categoryMap[this.state.category][1]}/>
                                    ]
                                : this.state.category == categories[1] ?
                                    [
                                        <Picker.Item label={categoryMap[this.state.category][0]} value={categoryMap[this.state.category][0]}/>,
                                        <Picker.Item label={categoryMap[this.state.category][1]} value={categoryMap[this.state.category][1]}/>,
                                        <Picker.Item label={categoryMap[this.state.category][2]} value={categoryMap[this.state.category][2]}/>,
                                    ]
                                : this.state.category == categories[2] ?
                                [
                                    <Picker.Item label={categoryMap[this.state.category][0]} value={categoryMap[this.state.category][0]}/>,
                                    <Picker.Item label={categoryMap[this.state.category][1]} value={categoryMap[this.state.category][1]}/>,
                                    <Picker.Item label={categoryMap[this.state.category][2]} value={categoryMap[this.state.category][2]}/>,
                                ]
                                :
                                [
                                    <Picker.Item label={categoryMap[this.state.category][0]} value={categoryMap[this.state.category][0]}/>,
                                    <Picker.Item label={categoryMap[this.state.category][1]} value={categoryMap[this.state.category][1]}/>,
                                    <Picker.Item label={categoryMap[this.state.category][2]} value={categoryMap[this.state.category][2]}/>,
                                    <Picker.Item label={categoryMap[this.state.category][3]} value={categoryMap[this.state.category][3]}/>,
                                ]
                                }
                    </Picker>
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.fieldTitle}>Notes:</Text>
                    {/* <TextInput 
                        value={this.state.notes}
                        onChangeText={(newText) => {
                            
                            this.setState({notes: newText})
                        }}
                    ></TextInput> */}
                     {/* <TextareaAutosize 
                            ref={(ref) => this.noteBox = ref}
                            minRows={3}
                            value={this.state.notes}
                            style={{width: '100%'}}
                            onChange={(event)=> { 
                                this.props.notesUpdater(this.timeSliceIndex, event.target.value);
                                this.setState({notes: event.target.value});
                            }}
                        /> */}
                        <textarea
                                ref={this.textAreaRef}
                                placeholder="Notes:"
                                rows={5}
                                value={this.state.notes}
                                onChange={(event) => this.setState({...this.state, notes: event.target.value})}
                            />
                
                </View>
            </View>
        );
    }
}


export default EditSlice;
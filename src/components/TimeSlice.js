import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { getCategoryColor } from '../static_data/category-data';
import '../styles/timeslice.css';

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);


const TimeSlice = ({timeslice, showNotes, showSubcategory, showDuration}) => {
    
    const category = timeslice.category;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: getCategoryColor(category),
            flexDirection: 'row',
            fontSize: '15px',
            width: '100%',
            height: '100%',
            borderColor: 'black',
            borderWidth: '1px',
        },
        categoryContainer: {
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            flex: 1,
            borderColor: 'black',
            borderRightWidth: '1px',
            height: '100%',
            paddingHorizontal: '5px',
            width: '100%',
            paddingVertical: '5px',
        },
        subcategoryContainer: {
            width: '100%',
            paddingHorizontal: '5px',
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            height: '100%',
            flex: 1,
            borderColor: 'black',
            borderRightWidth: '1px',
            paddingVertical: '5px',
        },
        timeContainer: {
            width: '100%',
            paddingHorizontal: '5px',
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            height: '100%',
            flex: 1,
            borderColor: 'black',
            borderRightWidth: (showNotes) ?  '1px' : '0px',
            paddingVertical: '5px',
        },
        notesContainer: {
            display: (showNotes) ? 'flex' : 'none',
            flexDirection: 'column',
            flexWrap: 'wrap',
            width: '100%',
            paddingHorizontal: '5px',
            justifyContent: 'center',
            textAlign: (showDuration) ? 'center' : (!showSubcategory) ? 'center' : 'left',
            alignSelf: 'center',
            height: '100%',
            flex: 1,
            paddingVertical: '5px',
        },
        sliceText: {
            fontSize: '15px',
            textAlignVertical: 'center',
        },
        html: {
            height: '100%',
        }
    });
    return (
        <html>
            <body>
        <View style={styles.container}>
            <div style={{ width: (showNotes) ? '25%' : '33%'}}>
            <View style={styles.categoryContainer}>
                <Text style={styles.sliceText}>{timeslice.category}</Text>
            </View>
            </div>
            { (showSubcategory) ? 
                <div style={{ width: (showNotes) ? '25%' : '33%'}}>
                <View style={styles.subcategoryContainer}>
                    <Text style={styles.sliceText}>{timeslice.subcategory}</Text>
                </View>
                </div>
                :
                null
            }
            { (showDuration) ? 
                <div style={{ width: (!showSubcategory) ? '33%' : (showNotes) ? '10%' : '33%'}}>
                <View style={styles.timeContainer}>
                    <Text style={styles.sliceText}>{timeslice.duration}</Text>
                </View>
                </div>
            :
                <div style={{ width: (!showSubcategory) ? '33%' : (showNotes) ? '10%' : '33%'}}>
                <View style={styles.timeContainer}>
                    <Text style={styles.sliceText}>{padToTwo(timeslice.hr)}:{padToTwo(timeslice.min)}:{padToTwo(timeslice.sec)}</Text>
                </View>
                </div>
            }   
            { (showNotes) ? 
                <div style={{ width: (showNotes) ? '40%' : '33%'}}>
                <View style={styles.notesContainer}>
                    { (timeslice.notes.length > 0) ? 
                        <Text style={styles.sliceText}>{timeslice.notes}</Text>
                        :
                        <Text style={styles.sliceText}> </Text>
                    }
                </View>
                </div>
                :
                null
            
            }
            
        </View>
        </body>
        </html>
    )
    
}


export default TimeSlice;
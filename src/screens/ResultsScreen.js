import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TimeSlice from '../components/TimeSlice';

import {categories, getCategoryColor} from '../static_data/category-data';

import Chart from 'chart.js';


class Results extends Component {

    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: categories,
                datasets: [
                    {
                        data:  this.dataSet,
                        backgroundColor: this.dataColors,
                    }
                ]
            },
            options: {
                //Customize chart options
                legend: {
                    display: false
                }
            }
        });
    }

    constructor(props) {
        super(props);
        this.classInfo = props.navigation.getParam('classInfo');
        this.timeSlices = props.navigation.getParam('timeSlices');
        this.resultsMap = {}
        for (let index in categories) {
            this.resultsMap[categories[index]] = {
                value: 0,
                color: getCategoryColor(categories[index]),
                title: categories[index]
            }
        }
        this.percentageSlices = [];
        this.aggregateData();
        this.generatePercentageSlices();
        this.graphData = this.mapToGraphData();

        this.dataSet = this.generateDataSet();
        this.dataColors = this.generateColors();
        this.state = {
            displayLabels: "block"
        }
        
    }

    generateDataSet() {
        var data = [];
        for (let i in categories) {
            data.push(this.resultsMap[categories[i]].value)
        }
        return data;
    }

    generateColors() {
        var colors = [];
        for (let i in categories) {
            colors.push(getCategoryColor(categories[i]));
        }
        return colors;
    }

    // toggleLabels() {
    //     if (this.state.displayLabels == 'block') {
    //         this.setState({displayLabels: 'none'});
    //     } else {
    //         this.setState({displayLabels: 'block'});
    //     }
    // }

    convertSliceToSec(slice) {
        return slice.sec + (60 * slice.min) + (3600 * slice.hr);
    }
    /**
     * Function is responsible for aggregating the data passed in in the time slices object and organizing 
     * so it may then be used in a pie chart
     */
    aggregateData() {
        // For each timeSlice, 
        for (let index in this.timeSlices) {
            // convert time to seconds
            var sliceTotal = this.convertSliceToSec(this.timeSlices[index]);
            // update the results map
            this.resultsMap[this.timeSlices[index].category].value = this.resultsMap[this.timeSlices[index].category].value + sliceTotal;
        }
    }

    generatePercentageSlices() {
        var totalSec = 0.0;
        for (let key in this.resultsMap) {
            totalSec += this.resultsMap[key].value;

        }


        for (let key in this.resultsMap) {
            var percentage = Math.round(100* (this.resultsMap[key].value / totalSec), 2);
            var runningTime = this.resultsMap[key].value;
            var totalHrs = Math.floor(runningTime / 3600);
            runningTime -= (3600 * totalHrs);
            var totalMins = Math.floor(runningTime / 60);
            runningTime -= (60 * totalHrs);
            var leftSec = runningTime;
            this.percentageSlices.push({category: this.resultsMap[key].title, hr: totalHrs, min: totalMins, sec: leftSec, notes: `${percentage}%`})
        }
    }
    mapToGraphData() {
        // for each category, append a new instance to array
        var data = [];

        for (let index in categories) {
            if (this.resultsMap[categories[index]].value > 0) {
                data.push(this.resultsMap[categories[index]])
            }
        }
        
        return data;
    }

    createImage() {
        // var body = document.getElementById('body-content');
        // htmlToImage.toPng(body)
        //     .then(function (dataUrl) {
        //         download(dataUrl, 'results.png');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    render() {
        return ( 
            <html>
                <body id="body-content">
            <div style={{width: '100%', height: '100%'}}>
            <View>
                <Text style={styles.headerText}>Analysis Results:</Text>
                <TouchableOpacity
                    onPress={() => this.createImage()}
                >   
                        <Text style={styles.downloadButton}>Download Results</Text>
                </TouchableOpacity>
                <Text style={styles.subheaderText}>Class Info:</Text>
                <View style={styles.classInfoContainer}>
                    <View style={styles.infoElement}>
                        <Text style={styles.infoLabel}>Class Name:</Text>
                        <Text style={styles.infoText}>{this.classInfo.className}</Text>
                    </View>
                    <View style={styles.infoElement}>
                        <Text style={styles.infoLabel}>Teacher Name:</Text>
                        <Text style={styles.infoText}>{this.classInfo.teacher}</Text>
                    </View>
                    <View style={styles.infoElement}>
                        <Text style={styles.infoLabel}>Allotted Time (min):</Text>
                        <Text style={styles.infoText}>{this.classInfo.allottedTime}</Text>
                    </View>
                    <View style={styles.infoElement}>
                        <Text style={styles.infoLabel}>Observer:</Text>
                        <Text style={styles.infoText}>{this.classInfo.observer}</Text>
                    </View>
                    <View style={styles.infoElement}>
                        <Text style={styles.infoLabel}>Class Size:</Text>
                        <Text style={styles.infoText}>{this.classInfo.classSize}</Text>
                    </View>
                    <View style={styles.infoElement}>
                        <Text style={[styles.infoLabel, { borderBottomWidth: '0px'}]}>Start Time:</Text>
                        <Text style={[styles.infoText, { borderBottomWidth: '0px'}]}>{this.classInfo.startTime}</Text>
                    </View>
                    
                </View>
                <Text style={styles.subheaderText}>Detailed Results:</Text>
                <View style={styles.timeSliceContainer}>

                    <FlatList
                        data={this.timeSlices}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index, separator}) => (
                            <TimeSlice
                                timeslice={this.timeSlices[index]}
                                showNotes={true}
                                showSubcategory={true}
                            />
                        )}
                    />
                </View>
                
                <Text style={[styles.subheaderText, { marginTop: '2%'}]}>Aggregate Results Results:</Text>
                <View style={styles.timeSliceContainer}>
                    <TimeSlice
                        timeslice={{category: "Category", subcategory: "Subcategory", notes: "Percentage", duration: "Total Duration"}}
                        showNotes={true}
                        showDuration={true}
                        showSubcategory={false}
                    />
                    <FlatList
                        data={this.percentageSlices}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index, separator}) => (
                            <TimeSlice
                                timeslice={this.percentageSlices[index]}
                                showNotes={true}
                                showSubCategory={false}
                            />
                        )}
                    />
                </View>

                <Text style={styles.keyTitle}>Graph Key</Text>
                <View style={styles.chartKeyContainer}>
                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={categories}
                        renderItem={({item, index, separator}) => (
                            <View style={styles.chartKeyElement}>
                                <Text style={styles.keyLabel}>{categories[index]}</Text>
                                <View style={[styles.keyColor, { backgroundColor: getCategoryColor(categories[index])}]}><Text style={styles.keyColor}> </Text></View>
                            </View>
                        )}
                    />
                </View>
                
                {/* <TouchableOpacity 
                    onPress={()=>this.toggleLabels()}
                >
                    <View style={styles.buttonContainer}>
                        <Text>Toggle Graph Labels</Text>
                    </View>
                </TouchableOpacity> */}

                <View style={styles.pieContainer}>
                    {/* <PieChart
                        data={this.graphData}
                        label={(labelRenderProps) => {
                            return labelRenderProps.dataEntry.title;
                        }}
                        labelStyle={{fontSize: '2px', display:`${this.state.displayLabels}`, width: '3px'}}
                        labelPosition={50}
                        radius={20}
                    /> */}
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </View>
            </View>
            </div>
            </body>
            {/* <ReactToPdf>
                <Text Hellow World></Text>
            </ReactToPdf> */}
            </html>
        );
    }
}
const styles = StyleSheet.create({
    piechart: {
        width: '100px',
        height: '100px',
    },
    chartKeyElement: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '3px',
    },
    keyLabel: {
        fontSize: '20px',
        marginRight: '5px'
    },
    keyColor: {
        width: '50px'
    },
    timeSliceContainer: {
        flex: 1,
        marginLeft: "5%",
        marginRight: "5%",
    },
    headerText: {
        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        marginVertical: '1%',
    },
    subheaderText: {
        marginLeft: '5%',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    chartKeyContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: "#fff1c9",
        padding: '5px',
        borderWidth: '1px',
        borderColor: 'black',
        alignSelf: 'center',
    },
    keyTitle: {
        alignSelf: 'center',
        marginTop: '30px',
        marginBottom: '10px',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '10px',
        height: '75px',
        width: '200px',
        backgroundColor: '#d8d8d8',
        justifyContent: 'center',
        borderRadius: '10px',
        borderColor: 'black',
        borderWidth: '1px',
    },
    classInfoContainer: {
        marginHorizontal: '5%',
        borderColor: 'black',
        borderWidth: '1px',
        marginBottom: '1%',
    },
    infoElement: {
        flexDirection: 'row',
    },
    infoLabel: {
        flex: 1,
        textAlign: 'center',
        fontSize: '17px',
        borderColor: 'black',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
    },
    infoText: {
        flex: 1,
        textAlign: 'center',
        // paddingLeft: '10px',
        fontSize: '17px',
        borderBottomWidth: '1px',
    },
    downloadButton: {
        textAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        width: '200px',
        height: '50px',
        backgroundColor: '#a8a8a8',
        borderColor: 'black',
        borderRadius: '10px',
        borderWidth: '1px',
        textAlignVertical: 'center',
        fontSize: '20px',
    },
    pieContainer: {
        marginTop: '1%',
    }
    
});

export default Results;
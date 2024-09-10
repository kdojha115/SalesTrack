// Version = 1.0


import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import CallLogs from 'react-native-call-log';

const CallDetails = () => {

    const [listData, setListData] = useState([]);

    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
      
        // Format to ensure two digits for hours, minutes, and seconds
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

    useEffect(() => {
        async function fetchData() {
            if (Platform.OS != 'ios') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                        {
                            title: 'Call Log Permission',
                            message: 'This app needs access to your call logs',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        CallLogs.loadAll().then((c) => setListData(c));
                        CallLogs.load(3).then((c) => console.log(c));
                        // const logs = await CallLogs.loadAll();
                        // console.log('Call Logs:', logs);
                        // setCallLogs(logs);
                    } else {
                        Alert('Call Log permission denied');
                        // console.log('Call Log permission denied');
                    }
                }
                catch (err) {
                    // console.warn(err);
                    // Alert.alert("Error", "Failed to fetch call logs.");
                    Alert(err);
                }
            }
            else {
                Alert("Sorry! You can't get call logs in iOS devices because of the security concern",

                );
            }
        }

        fetchData();
    }, []);

    const ItemView = ({ item }) => {
        return (

            <View>
                <Text style={styles.textStyle}>
                    Name : {item.name ? item.name : 'Unkonwn'}
                    {'\n'}
                    PhoneNumber : {item.phoneNumber}
                    {'\n'}
                    DateTime : {item.dateTime}
                    {'\n'}
                    Duration : {formatDuration(item.duration)}
                    
                    {/* {'\n'} */}
                    {/* RawType : {item.rawType} */}
                    {/* {'\n'} */}
                    {/* Timestamp : {item.timestamp} */}
                    {'\n'}
                    Type : {item.type}
                </Text>
            </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titleText}>
                    Call Logs of your Devices
                </Text>
                <FlatList
                    data={listData}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );

}

export default CallDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // borderRadius: 12,
        backgroundColor: 'grey'
    },
    listContainer: {
        paddingBottom: 20,
    },
    callLogItem: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'blue',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    phoneNumber: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    detail: {
        fontSize: 14,
        color: '#888',
    },
    timestamp: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'right',
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 16,
        marginVertical: 10,
    },
});


// Version 1.1

// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, View, Text, FlatList, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
// import CallLogs from 'react-native-call-log';
// import axios from 'axios';

// const CallDetails = () => {

//     const [listData, setListData] = useState([]);

//     const formatDuration = (totalSeconds) => {
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;
//         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     };

//     const userId = 1; // Replace with the actual user ID you are using

//     const createCallLogInDB = async (callLog) => {
//         try {
//             const response = await axios.post(`http://192.168.1.2:8080/api/calllogs/create/${userId}`, {
//                 name: callLog.name || 'Unknown',
//                 phoneNumber: callLog.phoneNumber,
//                 callType: callLog.type, // Use `type` from call log for callType
//                 startTime: new Date(callLog.timestamp).toISOString(),
//                 duration: callLog.duration,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log('Call log saved:', response.data);
//         } catch (error) {
//             console.error('Error saving call log:', error);
//             Alert.alert('Error', 'Failed to save call log.');
//         }
//     };

//     const fetchCallLogsFromDB = async () => {
//         try {
//             const response = await axios.get(`http://192.168.1.2:8080/api/calllogs/user/${userId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             setListData(response.data);
//         } catch (error) {
//             console.error('Error fetching call logs:', error);
//             Alert.alert('Error', 'Failed to fetch call logs.');
//         }
//     };

//     useEffect(() => {
//         async function fetchDeviceCallLogs() {
//             if (Platform.OS !== 'ios') {
//                 try {
//                     const granted = await PermissionsAndroid.request(
//                         PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
//                         {
//                             title: 'Call Log Permission',
//                             message: 'This app needs access to your call logs',
//                             buttonNeutral: 'Ask Me Later',
//                             buttonNegative: 'Cancel',
//                             buttonPositive: 'OK',
//                         },
//                     );

//                     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                         const callLogs = await CallLogs.loadAll();
//                         callLogs.forEach(async (log) => {
//                             await createCallLogInDB(log); // Save each call log in the database
//                         });
//                         await fetchCallLogsFromDB(); // Fetch saved call logs from the backend
//                     } else {
//                         Alert('Call Log permission denied');
//                     }
//                 } catch (err) {
//                     Alert(err);
//                 }
//             } else {
//                 Alert("Sorry! You can't get call logs on iOS devices because of security concerns");
//             }
//         }

//         fetchDeviceCallLogs();
//     }, []);

//     const ItemView = ({ item }) => {
//         return (
//             <View>
//                 <Text style={styles.textStyle}>
//                     Name : {item.name ? item.name : 'Unknown'}
//                     {'\n'}
//                     PhoneNumber : {item.phoneNumber}
//                     {'\n'}
//                     Start Time : {item.startTime}
//                     {'\n'}
//                     Duration : {formatDuration(item.duration)}
//                     {'\n'}
//                     Call Type : {item.callType}
//                 </Text>
//             </View>
//         );
//     };

//     const ItemSeparatorView = () => {
//         return (
//             <View
//                 style={{
//                     height: 0.5,
//                     width: '100%',
//                     backgroundColor: '#C8C8C8',
//                 }}
//             />
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View>
//                 <Text style={styles.titleText}>
//                     Call Logs of your Device
//                 </Text>
//                 <FlatList
//                     data={listData}
//                     ItemSeparatorComponent={ItemSeparatorView}
//                     renderItem={ItemView}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             </View>
//         </SafeAreaView>
//     );
// };

// export default CallDetails;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: 'white',
//     },
//     titleText: {
//         fontSize: 22,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     textStyle: {
//         fontSize: 16,
//         marginVertical: 10,
//     },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const SMSDetector = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [incomingSMS, setIncomingSMS] = useState('');

  const requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS messages.',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Failed to request SMS permission:', error);
      return false;
    }
  };

  const startSMSDetection = async () => {
    const hasPermission = await requestSMSPermission();
    if (!hasPermission) {
      console.log('SMS permission not granted');
      return;
    }

    setIsDetecting(true);
    SmsAndroid.autoReceiveSms((event) => {
      const sms = JSON.parse(event.body);
      setIncomingSMS(sms.body);
    });
  };

  const stopSMSDetection = () => {
    setIsDetecting(false);
    SmsAndroid.stopListen();
  };

  useEffect(() => {
    return () => {
      if (isDetecting) {
        SmsAndroid.stopListen();
      }
    };
  }, [isDetecting]);

  return (
    <View>
      <Text>{incomingSMS}</Text>
      {isDetecting ? (
        <Button title="Stop" onPress={stopSMSDetection} />
      ) : (
        <Button title="Start" onPress={startSMSDetection} />
      )}
    </View>
  );
};

export default SMSDetector;
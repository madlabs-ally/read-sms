import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const UserData = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  console.log(route.params.name)

  const getMovies = async () => {
    try {
      const response = await fetch('https://3h4jk54e3l.execute-api.eu-central-1.amazonaws.com/sms/many/Wanda_Bongo');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({creator_name}) => creator_name}
          renderItem={({item}) => (
            <Text>
              {item.creator_name}, {item.message}, {item.EntityIndexSK}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default UserData;
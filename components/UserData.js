import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

const UserData = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  console.log(route.params.name);

  const getMovies = async () => {
    try {
      const response = await fetch('https://3h4jk54e3l.execute-api.eu-central-1.amazonaws.com/sms/many/Madlabs173');
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ creator_name }) => creator_name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.creatorName}>{item.creator_name}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.entityIndex}>{item.EntityIndexSK}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 50,
  },
  itemContainer: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  entityIndex: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserData;

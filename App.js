import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';

const App = () => {
  const [islodin, setIslodin] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userid, setUserid] = useState(0);
  console.log(userid, 'ti');

  const submit = async () => {
    if (title.length <= 1 || body.length <= 1 || userid == 0) {
      if (title.length <= 1) {
        alert('invalid title');
      } else {
        if (body.length <= 1) {
          alert('invalid name');
        } else {
          if (userid == 0) {
            alert('invalid userid');
          }
        }
      }
    } else {
      setIslodin(true);
      const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: userid,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      let Data = await data.json();

      let newArr = apiData;
      newArr.push(Data);
      setApiData(newArr);

      setIslodin(false);
      setTitle('');
      setUserid('');
      setBody('');
    }
  };

  if (islodin) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  } else {
    console.log(apiData, 'CHECKKKKKKKKKK');
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 10,

            alignItems: 'center',
          }}>
          <TextInput
            style={{fontSize: 20, borderBottomWidth: 1, width: '60%'}}
            placeholder="Titel"
            autoFocus={true}
            onChangeText={(e) => {
              setTitle(e);
            }}
          />
          <TextInput
            style={{fontSize: 20, borderBottomWidth: 1, width: '60%'}}
            placeholder="name"
            onChangeText={(e) => {
              setBody(e);
            }}
          />
          <TextInput
            style={{fontSize: 20, borderBottomWidth: 1, width: '60%'}}
            placeholder="user id"
            keyboardType="numeric"
            onChangeText={(e) => {
              setUserid(e);
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              width: '60%',

              padding: 5,
              marginTop: 10,
              borderRadius: 25,
            }}
            onPress={submit}>
            <Text style={{color: 'white', fontSize: 30}}>submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 7}}>
          <ScrollView style={{backgroundColor: 'rgb(217, 217, 217)'}}>
            {apiData.map((data, ind) => {
              console.log(data, 'data');
              return (
                <View
                  style={{
                    marginVertical: 10,
                    width: '100%',
                    // alignItems: 'center',
                    borderWidth: 1,
                    width: '80%',
                    alignSelf: 'center',
                    padding: 10,
                    borderColor: 'blue',
                    borderRadius: 20,
                  }}
                  key={ind}>
                  <Text
                    style={{
                      fontSize: 30,
                      alignSelf: 'center',
                      textTransform: 'uppercase',
                    }}>
                    {data.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 20, textTransform: 'uppercase'}}>
                        name:
                      </Text>
                      <Text style={{fontSize: 20, textTransform: 'uppercase'}}>
                        userid:
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 20}}>{data.body}</Text>
                      <Text style={{fontSize: 20}}>{data.userId}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
};
export default App;

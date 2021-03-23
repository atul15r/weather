import React, {FC, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Text,
  Input,
  Header,
  Button,
  Container,
  Title,
  Body,
  Content,
} from 'native-base';
import axios from 'axios';

const Status = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

type Props = {navigation: any};

export const Weather: FC<Props> = ({navigation}) => {
  const [status, setStatus] = useState(Status.idle);
  const [txt, setTxt] = useState('');

  const onSubmit = async () => {
    try {
      setStatus(Status.pending);
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${txt}`,
      );
      console.log(res.data);
      if (res) {
        navigation.navigate('WeatherDetails', {doc: res.data});
      }
      setStatus(Status.resolved);
    } catch (error) {
      console.log('some error occur');
      setStatus(Status.rejected);
    }
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>Search Country Details</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 10,
          paddingHorizontal: 5,
        }}>
        <Input
          placeholder="Enter Country Name"
          onChangeText={(e: string) => setTxt(e)}
          value={txt}
        />
        <Button onPress={onSubmit} light={!txt} disabled={!txt}>
          <Text style={{color: txt ? '#fff' : '#ccc'}}>Submit</Text>
          {Status.pending === status ? (
            <ActivityIndicator color={'#fff'} size={13} style={{margin: 5}} />
          ) : null}
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({});

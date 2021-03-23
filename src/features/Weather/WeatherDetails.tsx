import React, {FC, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  Text,
  View,
  Header,
  Button,
  Title,
  Body,
  Content,
  Left,
  Container,
} from 'native-base';
import axios from 'axios';
import {SvgUri} from 'react-native-svg';

// @ts-ignore
import JSONTree from 'react-native-json-tree';
const key = '2056e1ca0ba39121e24d34147ce8519d';

type Props = {navigation: any; route: any};

export const WeatherDetails: FC<Props> = ({navigation, route}) => {
  const {doc} = route.params;
  const [loading, setLoading] = useState(false);

  const [weatherRes, setWeatherRes] = useState();

  const findWeatherInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${key}&query=${doc[0]?.capital}`,
      );

      if (res?.data) {
        setWeatherRes(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text style={{color: '#fff', textTransform: 'capitalize'}}>
              back
            </Text>
          </Button>
        </Left>
        <Body>
          <Title>Country Details</Title>
        </Body>
      </Header>
      <View style={{padding: 15}}>
        <View
          style={{
            width: 100,
            height: 80,
            overflow: 'hidden',
            position: 'relative',
          }}>
          <SvgUri width="100%" height="100%" uri={doc[0]?.flag} />
        </View>
        <Text style={{fontWeight: '700', fontSize: 17}}>{doc[0]?.capital}</Text>
        <Text style={{color: '#6b6b6b', fontSize: 15}}>
          Population:
          <Text style={{fontWeight: '700', fontSize: 17}}>
            &nbsp;{doc[0]?.population}
          </Text>
        </Text>
        <Text style={{color: '#6b6b6b', fontSize: 15}}>
          latlng:
          <Text style={{fontWeight: '700', fontSize: 17}}>
            &nbsp;{JSON.stringify(doc[0]?.latlng)}
          </Text>
        </Text>

        <Button
          activeOpacity={0.6}
          style={styles.btn}
          onPress={() => findWeatherInfo()}>
          <Text style={{color: '#fff'}}>Capital Weather</Text>
          {loading ? (
            <ActivityIndicator color={'#fff'} size={13} style={{margin: 5}} />
          ) : null}
        </Button>
      </View>

      <Content>
        {weatherRes ? (
          <JSONTree data={weatherRes} isLightTheme={false} />
        ) : null}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    paddingVertical: 15,
    backgroundColor: '#039af4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 7,
    flexDirection: 'row',
  },
  modalContainer: {
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

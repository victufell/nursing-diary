import React from 'react'

import { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View, TouchableOpacity } from 'react-native';

import colors from '../../utils/colors'

const Home = ({ navigation }) => {
  const [currentDay, setCurrentDay] = useState({})
  const [currentSchedule, setCurrentSchedule] = useState({})

  const handlePacient = (item) => {
    setCurrentSchedule(item)
    navigation.navigate('Patient', { data: item })
  }
  
  useEffect(() => {
  }, [currentSchedule])

  return (
    <View style={{height: '100%', paddingTop: 80}}>
      <Agenda
        style={{}}
        items={{
          '2022-04-17': [{ description: 'descrição do paciente', room: 1, name: 'Victor', remedy: 'Dipirona', hour: Date.now() }],
          '2022-04-18': [{ description: 'descrição do paciente', room: 4, name: 'Fellype', remedy: 'Dipirona', hour: Date.now() }],
        }}
        onDayPress={setCurrentDay}
        renderItem={(item, firstItemInDay) => {
          return (
            <TouchableOpacity style={{justifyContent: 'center', paddingTop: 18}} onPress={() => handlePacient(item)}>
              <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
                Paciente: 
                <Text style={{fontWeight: '500' }}>
                  {" "}{item.name}
                </Text>
              </Text>
              <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
                Descrição: 
                <Text style={{fontWeight: '500' }}>
                  {" "}{item.description}
                </Text>
              </Text>
              <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
                Ação: 
                <Text style={{fontWeight: '500' }}>
                  {" "}{item.remedy}
                </Text>
              </Text>
              <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
                Sala: 
                  <Text style={{fontWeight: '500' }}>
                    {" "}{item.room}
                  </Text>
              </Text>
            </TouchableOpacity>
          );
        }}
        theme={{
          arrowColor: colors.purple,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 18,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 18,
          selectedDayBackgroundColor: colors['purple-light'],
          selectedDayTextColor: colors.purple,
          todayTextColor: colors.purple,
          dayTextColor: colors.black,
          textSectionTitleColor: colors.black,
          monthTextColor: colors.purple,
          indicatorColor: colors.purple,
        }}
      />
    </View>
  )
}

export default Home
import React from 'react'

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Agenda } from 'react-native-calendars';

import colors from '../../utils/colors'

const Home = () => {
  const [currentDay, setCurrentDay] = useState({})

  return (
    <View style={{height: '100%'}}>
      <Agenda
        style={{}}
        items={{
          '2022-04-17': [{ description: 'descrição do paciente', room: 1, name: 'Victor', remedy: 'Dipirona', hour: Date.now() }],
          '2022-04-18': [{ description: 'descrição do paciente', room: 4, name: 'Fellype', remedy: 'Dipirona', hour: Date.now() }],
        }}
        onDayPress={setCurrentDay}
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={{justifyContent: 'center', paddingTop: 18}}>
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
            </View>
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
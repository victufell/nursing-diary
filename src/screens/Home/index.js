import React from 'react'
import moment from 'moment'
import { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View, TouchableOpacity } from 'react-native';

import services from '../../services';

import colors from '../../utils/colors'

const Home = ({ navigation }) => {
  const [currentDay, setCurrentDay] = useState({})
  const [scheduleAPI, setScheduleAPI] = useState(null)
  const [currentSchedule, setCurrentSchedule] = useState({})

  useEffect(() => {
    services.getSchedule()
      .then(({ data = {} }) => {
        console.log('data', data)
        
        const dataFormatted = Object.values(data)
          .reduce((acc, schedule = {}) => {
            const isoDate = moment(schedule.Dia, 'DD-MM-YYYY').toISOString();
            const date = isoDate.split('T')[0]
            return {
              ...acc,
              [date]: [{
                ...schedule
              }]
            }
          }, {})

        setScheduleAPI(dataFormatted)
      })
  }, [])

  const handlePacient = (item) => {
    setCurrentSchedule(item)
    navigation.navigate('Patient', { data: item })
  }

  return (
    <View style={{height: '100%', paddingTop: 80}}>
    {!!scheduleAPI && <Agenda
      style={{}}
      items={scheduleAPI}
      // items={{}}
      onDayPress={setCurrentDay}
      renderItem={(item, firstItemInDay) => {
        return (
          <TouchableOpacity style={{justifyContent: 'center', paddingTop: 18}} onPress={() => handlePacient(item)}>
            <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
              Paciente: 
              <Text style={{fontWeight: '500' }}>
                {" "}{item.Nome}
              </Text>
            </Text>
            <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
              Descrição: 
              <Text style={{fontWeight: '500' }}>
                {" "}{item.Observacoes}
              </Text>
            </Text>
            {item.Tarefas && <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
              Ação: 
              {Object.values(item.Tarefas)
                .map((task) => {
                  return (
                    <Text style={{fontWeight: '500' }}>
                      {" "}{task},
                    </Text>
                  )
                })
              }
            </Text>}
            {item.Sala && <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>
              Sala: 
                <Text style={{fontWeight: '500' }}>
                  {" "}{item.Sala}
                </Text>
            </Text>}
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
    />}
    </View>
  )
}

export default Home
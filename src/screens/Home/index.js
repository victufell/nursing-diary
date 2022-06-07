import React from 'react'
import moment from 'moment'
import { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View, TouchableOpacity } from 'react-native';

import services from '../../services';

import colors from '../../utils/colors'

import Header from '../../components/Header'

const BlockItemText = ({text}) => (
  <Text style={{fontWeight: '500' }}>
    {" "}{text},
  </Text>
)

const Block = ({ label, value, list = [], condition = true }) => {
  const hastList = list.length > 0
  return (
    condition && <Text style={{ color: colors.gray, fontSize: 16, fontWeight: 'bold' }}>
      {label} 
      {hastList
        ? list.map((item) => (
          <BlockItemText text={item}/>
        ))
        : <BlockItemText text={value} />
      
      }
    </Text>
  )
}

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
    <View style={{height: '100%', backgroundColor: colors.blue }}>
      <Header />
    {!!scheduleAPI && <Agenda
      style={{}}
      items={scheduleAPI}
      // items={{}}
      onDayPress={setCurrentDay}
      renderItem={(item, firstItemInDay) => {
        const tasks = item.Tarefas ? Object.values(item.Tarefas) : []
        return (
          <TouchableOpacity style={{justifyContent: 'center', paddingTop: 18}} onPress={() => handlePacient(item)}>
            <Block label="Paciente:" value={item.Nome} />
            <Block label="Descrição:" value={item.Observacoes} />
            <Block label="Ação:" value={item.Observacoes} list={tasks} condition={item.Tarefas}/>
            <Block label="Sala:" value={item.Sala} condition={item.Sala}/>
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
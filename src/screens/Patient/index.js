import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../utils/colors'

import { StyleSheet } from 'react-native';


function MyCheckbox({ isSelected, setSelection }) {

  function onCheckmarkPress() {
    setSelection(!isSelected);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, isSelected && styles.checkboxChecked]}
      onPress={onCheckmarkPress}>
      {isSelected && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

const formatDate = (timestamp = Date.now()) => {

  const date = new Date(timestamp);
  const currentDate = `${date.getDate()}`.padStart(2, '0')
  const currentMonth = `${date.getMonth() + 1}`.padStart(2, '0')
  const currentYear = date.getFullYear()
  const currentHour = `${date.getHours()}`.padStart(2, '0')
  const currentMinutes = `${date.getMinutes()}`.padStart(2, '0')
  const currentSeconds = `${date.getSeconds()}`.padStart(2, '0')
  return `${currentDate}/${currentMonth}/${currentYear} - ${currentHour}:${currentMinutes}:${currentSeconds}`
}

const Patient = ({ route = {} }) => {
  const [isSelected, setSelection] = useState(false);

  const { data = {} } = route?.params || {}

  const {
    hour,
    name = 'Victor',
    remedy = 'Dipirona',
    room = 1,
    description = 'Uma descrição top',
  } = data

  const checkedText = isSelected ? 'Sim' : 'Não'
  const defaultText = {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 18,
  }
  const secondaryText = {
    color: colors.gray,
    fontSize: 16
  }

  const shadow = {
    shadowOffset: {
      width: 2,
      height: -10
    },
    shadowOpacity: 0.20,
    shadowRadius: 11
  }
  return (
    <SafeAreaProvider>
      <View style={{ paddingHorizontal: 24, paddingVertical: 80 }}>
        <Text style={{ color: colors.blue, fontSize: 24, fontWeight: 'bold', marginBottom: 24, textDecorationColor: colors.blue, textDecorationLine: 'underline' }}>Paciente: {name}</Text>

        <View style={{ alignItems: 'center',  backgroundColor: colors.white, flexDirection: 'row', borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>
          <View >
            <Text style={{ width: 40, height: 40, backgroundColor: colors.purple, borderRadius: 40, marginRight: 12 }}></Text>
          </View>
          
          <View>
            <Text style={defaultText}>Remédio: {" "} 
              <Text style={secondaryText}>{remedy}</Text>
            </Text>
            
            <Text style={defaultText}>Ás: {" "}
                <Text style={secondaryText}>{formatDate(hour)}</Text>
              </Text>

            <Text style={defaultText}>Sala: {" "}
              <Text style={secondaryText}>{room}</Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>
          <Text style={{ color: colors.blue, fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Informações adicionais</Text>
          
          <Text style={ [defaultText, { marginBottom: 4 }] }>Descrição:
          </Text>
          <Text style={secondaryText}>{description}</Text>
          
          <Text style={ [defaultText, { marginBottom: 4, marginTop: 12 }] }>Concluído:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[secondaryText, {marginRight: 12, textDecorationLine: 'underline'}]}>
              {checkedText}
            </Text>
            <MyCheckbox 
              isSelected={isSelected}
              setSelection={setSelection}
            />
          </View>

        </View>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.purple,
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: colors.purple,
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Patient
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

import colors from '../../utils/colors';

import moment from 'moment';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

import services from '../../services';

import Header from '../../components/Header'

const SearchPatient = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [inputData, setInputData] = useState({
    Sala: '',
    Observacoes: '',
  });

  const defaultInputStyle = {
    height: 40,
    marginBottom: 12,
    marginTop: 4,
    borderWidth: 1,
    padding: 10,
    color: colors.black,
    borderRadius: 4
  }

  const [items, setItems] = useState([
      { 
        "label": "Carlos Silva dos Santos",
        "value": 0,
        "Dia": "07-05-2022", 
        "Tarefas": { 
          "01": "dar banho",
          "02":"trocar cama de roupa",
          "03":"Reabastecer bolsa"
        },
        "CPF": "74198356084", 
        "Nome": "Carlos Silva dos Santos", 
        "Observacoes": "", 
        "Sala":"102"
      },
      { 
        "label": "Victor Fellype",
        "value": 1,
        "Dia": "07-05-2022", 
        "Tarefas": { 
          "01": "dar banho",
          "02":"trocar cama e roupa",
        },
        "CPF": "20316078042", 
        "Nome": "Victor Fellype", 
        "Observacoes": "", 
        
        "Sala":"102"
      },
  ]);

  useEffect(() => {
    setIsDisabled(false)
  }, [])
  
  const handleNewScheduleItem = () => {
    setIsDisabled(true)
    const itemSelected = items.find((item) => item.value === value)
    
    const date = new Date()
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    
    const data = {
      ...itemSelected,
      ...inputData,
      "TimeStamp": date.getTime(), 
      "Dia": formattedDate, 
    }

    return services.postScheduleItem({ data })
      .finally(() => setIsDisabled(false))
  }
  return (
      <SafeAreaProvider>
        <Header />
        <View style={{ marginTop: 24, marginBottom: 24, paddingHorizontal: 24 }}>
          <Text style={{marginBottom: 4}}>Pacientes</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione"
            style={{marginBottom: 'auto'}}
          />
        </View>

          <View style={{ paddingHorizontal: 24, paddingTop: 72 }}>
            <Text>Sala</Text>
            <TextInput
              style={defaultInputStyle}
              onChangeText={(value) => setInputData({
                ...inputData,
                'Sala': value
              })}
              placeholder="Sala"
              value={inputData.Sala}
            />
            <Text>Observação</Text>
            <TextInput
              style={defaultInputStyle}
              onChangeText={(value) => setInputData({
                ...inputData,
                'Observacoes': value
              })}
              placeholder="Observações"
              value={inputData.Observacoes}
            />
          </View>
        
        <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
          <View style={{ backgroundColor: colors.green, borderRadius: 8, paddingVertical: 12 }}>
            <Button
              disabled={isDisabled}
              color={colors.white}
              title="Enviar paciente"
              onPress={handleNewScheduleItem}
              accessibilityLabel="Enviar paciente"
            />
          </View>
        </View>
      </SafeAreaProvider>
  )
}

export default SearchPatient
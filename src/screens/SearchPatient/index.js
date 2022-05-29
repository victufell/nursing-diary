import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

import colors from '../../utils/colors';

import moment from 'moment';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Button
} from 'react-native';

import services from '../../services';

const SearchPatient = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
      "TimeStamp": date.getTime(), 
      "Dia": formattedDate, 
    }

    return services.postScheduleItem({ data })
      .then(console.log)
      .finally(() => setIsDisabled(false))
  }
  return (
      <View style={{paddingTop: 80}}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Button
          disabled={isDisabled}
          color={colors.blue}
          title="Enviar paciente"
          onPress={handleNewScheduleItem}
          accessibilityLabel="Enviar paciente"
        />
      </View>
  )
}

export default SearchPatient
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  Text, 
  View, 
  Pressable, 
  StyleSheet,
  TextInput, 
  ScrollView,
  Button
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../utils/colors'

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

  const momentDate = moment(timestamp, 'DD-MM-YYYY');
  const date = new Date(momentDate)
  
  const currentDate = `${date.getDate()}`.padStart(2, '0')
  const currentMonth = `${date.getMonth() + 1}`.padStart(2, '0')
  const currentYear = date.getFullYear()
  const currentHour = `${date.getHours()}`.padStart(2, '0')
  const currentMinutes = `${date.getMinutes()}`.padStart(2, '0')
  const currentSeconds = `${date.getSeconds()}`.padStart(2, '0')
  return `${currentDate}/${currentMonth}/${currentYear} - ${currentHour}:${currentMinutes}:${currentSeconds}`
}

const Patient = ({ navigation, route = {} }) => {
  const [isSelected, setSelection] = useState(false);
  const [notes, setNotes] = useState([{ note: 'Tomou remédio', key: 0 }, { note: 'Tomou banhou', key: 1 }]);
  const [annotation, setAnnotation] = useState('');

  const handleSendAnnotation = () => {
    setNotes([...notes, { note: annotation, key: Math.random() }]);
    setAnnotation('')
  }

  const handleDeleteNote = (key) => {
    setNotes(notes.filter((note) => note.key !== key))
  }

  const { data = {} } = route?.params || {}
  const {
    Nome,
    Dia,
    Observacoes,
    Tarefas
  } = data

  useEffect(() => {
    // if (!name && !remedy && !hour) {
    //   console.log('entrei')
    //   navigation.navigate('Home')
    // }
  }, [])

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
      <ScrollView>

        <View style={{ paddingHorizontal: 24, paddingVertical: 80 }}>
          <Text style={{ color: colors.blue, fontSize: 24, fontWeight: 'bold', marginBottom: 24, textDecorationColor: colors.blue, textDecorationLine: 'underline' }}>
            Paciente: {Nome}
          </Text>

          <View style={{ alignItems: 'center',  backgroundColor: colors.white, flexDirection: 'row', borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>
            <View >
              <Text style={{ width: 40, height: 40, backgroundColor: colors.purple, borderRadius: 40, marginRight: 12 }}></Text>
            </View>
            
            <View>
              
              <Text style={defaultText}>Ás: {" "}
                <Text style={secondaryText}>{formatDate(Dia)}</Text>
              </Text>

              {/* <Text style={defaultText}>Sala: {" "}
                <Text style={secondaryText}>{room}</Text>
              </Text> */}
            </View>
          </View>

          <View style={{ marginTop: 24, backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>
            <Text style={{ color: colors.blue, fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Informações adicionais</Text>
            
            <Text style={ [defaultText, { marginBottom: 4 }] }>Descrição:
            </Text>
            <Text style={secondaryText}>{Observacoes}</Text>
            
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

          <Text style={{ color: colors.blue, marginTop: 24, fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Anotações</Text>

          <TextInput
            style={{
              height: 120,
              borderRadius: 4,
              borderWidth: 0,
              borderColor: colors.black,
              backgroundColor: colors.white,
              color: colors.black,
              padding: 12,
              marginBottom: 12,
              fontSize: 18,
              textAlignVertical: 'top'
            }}
            multiline
            numberOfLines={6}
            onChangeText={setAnnotation}
            value={annotation}
          />
          <Button
            color={colors.blue}
            title="Enviar anotação"
            onPress={handleSendAnnotation}
            accessibilityLabel="Enviar anotação"
          />

          <Text style={{ color: colors.blue, marginTop: 24, fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Histórico de anotações</Text>
          {notes.map(({ note, key }) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 24, marginBottom: 8, backgroundColor: colors.white, borderRadius: 4}} key={key}>
                <Text style={[secondaryText, { textDecorationLine: 'underline', width: '90%' }]}>
                  {note}
                </Text>
                <Ionicons name="trash" size={24} color={colors.red} onPress={() => handleDeleteNote(key)}/>
              </View>

            )
          })}
        </View>
      </ScrollView>
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
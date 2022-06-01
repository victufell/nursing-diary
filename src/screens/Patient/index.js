import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  Text, 
  View, 
  Pressable, 
  StyleSheet,
  TextInput, 
  ScrollView,
  Button,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { Octicons, Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import colors from '../../utils/colors'

import Header from '../../components/Header'

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

const InfoComp = ({ data = {}, checkedText, isSelected, setSelection, handleToggleModal }) => {
  console.log('data.Tarefas', data.Tarefas)

  const tasks = data.Tarefas ? Object.values(data.Tarefas).map((item, index) => ({ id: `${item}-${index}`, title: item })) : []
  console.log('tasks', tasks)
  return (
    <Fragment>
      <View style={{backgroundColor: colors.green, paddingTop: 80, paddingBottom: 40, paddingLeft: 24}}>
        <Ionicons name="arrow-back-outline" size={24} color={colors.white} onPress={handleToggleModal}/>
      </View>

      <View style={[{ flex: 1, backgroundColor: colors.blue, paddingTop: 40, paddingHorizontal: 24, }]}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: 'bold', marginBottom: 24, textDecorationLine: 'underline' }}>
          {data.Nome}
        </Text>
        
        <View style={{ alignItems: 'center', backgroundColor: colors.white, flexDirection: 'row', borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>
          <View>
            <MaterialIcons name="elderly" size={24} color="black" />
          </View>
          
          <View style={{ marginLeft: 12, marginRight: 'auto' }}>
            <Text style={defaultText}>
              <Text style={secondaryText}>{formatDate(data.Dia)}</Text>
            </Text>
          </View>

          <View>
            <Text style={defaultText}>
              <Text style={[secondaryText, { textDecorationLine: 'underline' }]}>{data.Sala}</Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 24,paddingVertical: 12, ...shadow }}>

          <Text style={ [defaultText] }>
            OBS:
          </Text>
          <Text style={secondaryText}>{data.Observacoes}</Text>
        </View>

        <View style={{ marginTop: 24, backgroundColor: colors.blue, minHeight: 180, paddingVertical: 12, borderRadius: 8 }}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginBottom: 24, color: colors.red, fontSize: 24, fontWeight: 'bold', backgroundColor: 'black', width: '100%', paddingLeft: 24, borderRadius: 8, paddingVertical: 4 }}>
              Tarefas {" "}

              <Octicons name="tasklist" size={24} color={colors.red} />
            </Text>
          </View>

          {tasks.map((task, index) => {
            return (
              <View key={task.id} style={{ marginBottom: 8, flexDirection: 'row', backgroundColor: colors.green }}>
                <Text style={{ textDecorationLine: 'underline', width: 'auto', fontSize: 18, fontWeight: 'bold', color: 'black', paddingLeft: 24 }}>{index+1}. {task.title} {" "}</Text>
                <MaterialCommunityIcons name="bell-alert" size={24} color={colors.red} />
              </View>
            )
          })}
        </View>

        <View style={[{...shadow}, { backgroundColor: colors.white, paddingLeft: 24, borderRadius: 8, paddingBottom: 12 }]}>
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
    </Fragment>
  )
}

const ActionIcon = ({ onPress = () => null, children }) => {
  return (
    <Pressable onPress={onPress} style={{ ...shadow, backgroundColor: colors.white, width: 60, height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
      {children}
    </Pressable>
  )
}

const Patient = ({ navigation, route = {} }) => {
  const [isSelected, setSelection] = useState(false);
  const [notes, setNotes] = useState([{ note: 'Tomou remédio', key: 0 }, { note: 'Tomou banhou', key: 1 }]);
  const [annotation, setAnnotation] = useState('');
  const [action, setAction] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const modalDataComponents = {
    'info': InfoComp,
    'annotation': {},
  }

  const ModalComponent = modalDataComponents[action]

  const handleSendAnnotation = () => {
    setNotes([...notes, { note: annotation, key: Math.random() }]);
    setAnnotation('')
  }

  const handleDeleteNote = (key) => {
    setNotes(notes.filter((note) => note.key !== key))
  }

  const handleToggleModal = () => {
    if(modalVisible) {
      setAction('')
    }

    setModalVisible(!modalVisible)

  }

  const { data = {} } = route?.params || {}
  const {
    Nome,
    Dia,
    Sala,
    Observacoes,
    Tarefas
  } = data

  const isEmptyData = Object.keys(data).length === 0

  useEffect(() => {
    if (ModalComponent) {
      setModalVisible(true)
    }
  }, [ModalComponent])

  const checkedText = isSelected ? 'Sim' : 'Não'

  return (
    <SafeAreaProvider>
      <Header />
      {isEmptyData
        ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.blue} />
            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 12, color: colors.black, fontWeight: 'bold' }}>
              Selecione uma tarefa na agenda
            </Text>
          </View>
        )
        : (
          <Fragment>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <ModalComponent 
                  data={data}
                  isSelected={isSelected}
                  checkedText={checkedText}
                  setSelection={setSelection}
                  handleToggleModal={handleToggleModal}
                />
              </Modal>

              <ScrollView>
                <View style={{ alignItems: 'center', backgroundColor: colors.white, flexDirection: 'row',  paddingHorizontal: 24,paddingVertical: 24, ...shadow }}>
                  <View>
                    <FontAwesome5 name="hospital-user" size={24} color={colors.black} />
                  </View>
                  
                  <View style={{ marginLeft: 12, marginRight: 'auto' }}>
                    <Text style={defaultText}>
                      <Text style={secondaryText}>{formatDate(Dia)}</Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={defaultText}>
                      <Text style={[secondaryText, { textDecorationLine: 'underline' }]}>{Sala}</Text>
                    </Text>
                  </View>
                </View>

                <View style={{ marginHorizontal: 24, marginVertical: 24, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <ActionIcon onPress={() => setAction('info')}>
                    <MaterialCommunityIcons name="folder-information" size={32} color={colors.green} />
                  </ActionIcon>
                  <ActionIcon onPress={() => setAction('annotation')}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={32} color={colors.green} />
                  </ActionIcon>
                </View>
              </ScrollView>
            </View>
          </Fragment>
        )

      }
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
    borderColor: colors.black,
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: colors.black,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Patient

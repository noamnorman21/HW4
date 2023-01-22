import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Note from './Note';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePickerExample from './ImagePickerExample';
import { Dimensions } from 'react-native';

export default function Notes(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', text: '', image: '', fullText: '' });
  const addNote = () => {
    setModalVisible(true);
  }
  const cancelNewNote = () => {
    setModalVisible(false);
    setNewNote({ title: '', text: '', image: '', fullText: '' });
  }
  const createNewNote = () => {
    if (newNote.title === '' || newNote.text === '' || newNote.fullText === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (props.notes.length === 0) {
      newNote.id = 1;
    }
    else {
      newNote.id = props.notes[props.notes.length - 1].id + 1;
    }
    props.onAdd(newNote, props.categoryID);

    setModalVisible(false);
    setNewNote({ title: '', text: '', image: '', fullText: '' });
  }
  const deleteNote = (id) => {
    props.onDelete(id, props.categoryID);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={props.backToAllNotes}>
            <Icon name="home" size={30} color="#900" />
          </TouchableOpacity>
        </View>
        <View style={styles.ph}>

        </View>
        <View style={styles.addNoteButtonContainer}>
          <TouchableOpacity onPress={addNote}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{props.category} - {props.notes.length}</Text>
      </View>
      <View style={styles.itemList}>
        <ScrollView>
          {props.notes.map((note) => (
            <Note onDelete={deleteNote} key={note.id} note={note} title={note.title} />
          ))}
        </ScrollView>
      </View>

      {/* modal for adding mew note  */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>New Note</Text>
          </View>
          <View style={styles.modalBody}>
            <TextInput style={styles.modalTextInput} placeholder="Note Title" onChangeText={(text) => setNewNote({ ...newNote, title: text })} value={newNote.title} />
            <TextInput style={styles.modalTextInput} placeholder="Note Description" onChangeText={(text) => setNewNote({ ...newNote, text: text })} value={newNote.text} />
            {/* function to get image from gallery */}
            <TextInput style={styles.modalTextInput} placeholder="Note Full Description" onChangeText={(text) => setNewNote({ ...newNote, fullText: text })} value={newNote.fullText} />
            <ImagePickerExample setImageUp={(uri) => { setNewNote({ ...newNote, image: uri }); }} />
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.saveButtonContainer} onPress={createNewNote}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButtonContainer} onPress={cancelNewNote}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 0.125,
    backgroundColor: '#6200ee',
  },
  ph: {
    flex: 5,
  },
  backButtonContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  addNoteButtonContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemList: {
    padding: 10,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 50
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
    paddingBottom: 10,
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalTextInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6200ee',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButtonContainer: {
    backgroundColor: '#6200ee',
    padding: 10,
    width: '45%',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 5,
    width: '45%',
  },
  cancelButtonText: {
    color: '#6200ee',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
});
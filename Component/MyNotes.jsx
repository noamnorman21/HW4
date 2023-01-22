import { Alert, TextInput, Modal, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useState } from 'react';
import Notes from './Notes';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function MyNotes() {
    const category = [
        {
            id: 1,
            name: 'All',
            notes: [
                {
                    id: 1,
                    title: 'Note 1',
                    text: 'This is note1',
                    fullText: 'This is note1',
                    image: 'https://picsum.photos/200/300'
                },
                {
                    id: 2,
                    title: 'Note 2',
                    text: 'This is note 2',
                    fullText: 'This is note2',
                    image: 'https://picsum.photos/200/300'
                },
            ]
        }
    ];
    const [categories, setCategories] = useState(category);
    const [activeCategory, setActiveCategory] = useState(null);
    const [buttonOpacity, setButtonOpacity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState(null);
    const showNotes = (category) => {
        setActiveCategory(category);
        setCategoryVisible(false);
    }
    const viewAll = () => {
        setActiveCategory(null);
        setCategoryVisible(true);
    }
    const deleteNote = (noteID, categoryID) => {
        const newCategories = categories.map(category => {
            if (category.id === categoryID) {
                category.notes = category.notes.filter(note => note.id !== noteID);
            }
            return category;
        });
        setCategories(newCategories);
    }
    const addNewNote = (note, categoryID) => {
        const newCategories = categories.map(category => {
            if (category.id === categoryID) {
                category.notes.push(note);
            }
            return category;
        });
        setCategories(newCategories);
    }
    const addNewCategory = () => {
        const newCategory = {
            id: categories.length + 1,
            name: newCategoryName,
            notes: []
        }
        setCategories([...categories, newCategory]);
        setModalVisible(false);
        setCategoryVisible(true);
        setNewCategoryName(null);
        Alert.alert('New Category Added');
    }
    return (
        <View style={styles.container}>
            <View style={styles.notes && { display: categoryVisible ? 'flex' : 'none' }}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.btn}
                            onPress={() => showNotes(item)}
                            onPressIn={() => setButtonOpacity(0.5)}
                            onPressOut={() => setButtonOpacity(1)}>
                            <View style={{ opacity: buttonOpacity }}>
                                <Text>{item.name} - {item.notes.length}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>

            {/* modal for adding new category  */}
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>New Category</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput style={styles.modalTextInput} placeholder="Category Name" value={newCategoryName} onChangeText={(text) => { setNewCategoryName(text) }} />
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveButtonContainer} >
                            <Text style={styles.saveButtonText} onPress={addNewCategory}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => {
                            { setModalVisible(false) }
                            { setCategoryVisible(true) }
                            { setNewCategoryName(null) }
                        }}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.notes && { display: categoryVisible ? 'flex' : 'none' }}>
                <TouchableOpacity style={styles.btnAdd} onPress={() => {
                    { { setModalVisible(true) } }
                    { { setCategoryVisible(false) } }
                }}>
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ display: activeCategory != null ? 'flex' : 'none' }}>
                {activeCategory && <Notes onAdd={addNewNote} onDelete={deleteNote} backToAllNotes={viewAll} notes={activeCategory.notes} category={activeCategory.name} categoryID={activeCategory.id} />}
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    btnAdd: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6200ee',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    btn: {
        flexDirection: 'row',
        marginTop: '20%',
        flex: 1,
        width: '100%',
        height: 50,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 50,
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
    },
    modalTextInput: {
        borderWidth: 1,
        borderColor: '#6200ee',
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 5,
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
    notes: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
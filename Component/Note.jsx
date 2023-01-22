import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Note(props) {
  const [expanded, setExpanded] = useState(false);
  const [expandedButton, setExpandedButton] = useState("Read More");
  return (
    <Card style={[styles.container, props.containerStyle, Platform.OS === 'ios' ? styles.iosContainer : null]}>
      <Card.Content>
        <Title style={[styles.title, props.titleStyle]}>
          {props.note.title}
          <TouchableOpacity>
            <Icon style={styles.deleteIcon} onPress={() => { props.onDelete(props.note.id) }} r name="delete" />
          </TouchableOpacity>
        </Title>

      </Card.Content>
      {props.note.image && <Card.Cover source={{ uri: props.note.image }} style={[styles.image, props.imageStyle]} />}
      {expanded ? (
        <Card.Content>
          <Paragraph style={[styles.text, props.textStyle]}>{props.note.fullText}</Paragraph>
        </Card.Content>
      ) : (
        <Card.Content>
          <Paragraph style={[styles.text, props.textStyle]} numberOfLines={3}>{props.note.text}</Paragraph>
        </Card.Content>
      )}
      <Card.Actions style={[styles.buttonContainer, props.buttonContainerStyle]}>
        <Button style={[styles.button, props.buttonStyle]} title={expandedButton} onPress={() => {
          setExpanded(!expanded);
          setExpandedButton(expandedButton === "Read More" ? "Read Less" : "Read More");
        }}>{expandedButton}</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  iosContainer: {
    // Additional styles for iOS devices
    marginHorizontal: 20,
    marginVertical: 10,
  },
  deleteIcon: {
    alignSelf: 'flex-start',
    fontSize: 30,
    color: "#900",
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 10,
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
});
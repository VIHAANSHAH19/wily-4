import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import db from '../config.js'
import firebase from 'firebase'
export default class IssueScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      buttonState: 'normal',
      scannedData: '',
      bookId: '',
      studentId: '',
      transactionMessage:''
    }
  }
  cameraPermission() {
    const { status } = Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    })
  }
  handledBarcodeScanned = ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }
  bookIssue=()=>{
    db.collection('transactions').add({
      studentId:this.state.studentId,
      bookId:this.state.bookId,
      date:firebase.firestore.Timestamp.now().toDate(),
      transactionMessage:"issue"
    })
    db.collection('books').doc(this.state.bookId).update({
      bookAvailability:false
    })
    db.collection('students').doc(this.state.studentId).update({
      numberOfBooksIssued:firebase.firestore.fieldValue.increment(1)
    })
    alert("bookIsIssued")
  }
  bookReturn=()=>{
    db.collection('transactions').add({
      studentId:this.state.studentId,
      bookId:this.state.bookId,
      date:firebase.firestore.Timestamp.now().toDate(),
      transactionMessage:"return"
    })
    db.collection('books').doc(this.state.bookId).update({
      bookAvailability:true
    })
    db.collection('students').doc(this.state.studentId).update({
      numberOfBooksIssued:firebase.firestore.fieldValue.increment(-1)
    })
    alert("bookIsReturned")
  }
  handleTransaction=()=>{
    var transactionMessage
    db.collection('books').doc(this.state.bookId).get()
    .then((doc)=>{
      var book=doc.data()
      if(book.bookAvailability==true){
        this.bookIssue()
        transactionMessage="issue"
      }
      else{
        this.bookReturn()
        transactionMessage="return"
      }
    })
    this.setState({
      transactionMessage:transactionMessage
    })
  }
  render() {
    if (this.state.buttonState === "clicked" && this.state.hasCameraPermissions === true) {
      return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handledBarcodeScanned}></BarCodeScanner>
      )
    }
    else if (this.state.buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <TextInput style={styles.inputBox} placeholder="studentId" onChangeText={(text) => { this.setState({ studentId: text }) }}></TextInput>
            <TouchableOpacity style={styles.button} onPress={this.cameraPermission}><Text>Scan</Text></TouchableOpacity>
          </View>
          <View style={styles.viewContainer}>
            <TextInput style={styles.inputBox} placeholder="bookId" onChangeText={(text) => { this.setState({ bookId: text }) }}></TextInput>
            <TouchableOpacity style={styles.button}><Text>Scan</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={this.handleTransaction}><Text>submit</Text></TouchableOpacity>

        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  viewContainer:{
flexDirection:"row",
marginTop:50
  },
  submitButton:{
    width: 110, height: 50, backgroundColor: "blue", borderWidth: 2, alignItems: "center", justifyContent: "center"
  },
  inputBox: {
    borderWidth: 2,
    width: 200,
    height: 50
  },
  container: { alignItems: "center", justifyContent: "center" },
  button: { width: 80, height: 50, backgroundColor: "lightgreen", borderWidth: 2, alignItems: "center", justifyContent: "center" }
})
import React from 'react'
import {View} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import IssueScreen from './screens/issue'
import SearchScreen from './screens/search'

export default class App extends React.Component{

constructor(){
  super()
}
render(){
  return(
<AppContainer/>
  )
}
}
const TabNavigator=createBottomTabNavigator({
issue:IssueScreen,
search:SearchScreen
})
const AppContainer=createAppContainer(TabNavigator)
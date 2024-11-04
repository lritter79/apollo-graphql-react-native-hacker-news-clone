import React from 'react'
import { Text, View } from 'react-native'



const Link:React.FC<{description:string, authToken?:string | null, votes?: any[], postedBy?: {name:string}}> = (props) => {
  return (
    <View>    <Text>{props.description}</Text>
å
</View>
  )
}

export default Link;
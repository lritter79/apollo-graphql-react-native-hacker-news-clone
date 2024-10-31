import React from 'react'
import { Text } from 'react-native'



const Link:React.FC<{description:string}> = (props) => {
  return (
    <Text>{props.description}</Text>
  )
}

export default Link;
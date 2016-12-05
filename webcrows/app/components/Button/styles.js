import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400"
  }
});

module.exports = styles
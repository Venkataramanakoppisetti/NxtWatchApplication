import React from 'react'

const ThemeContext = React.createContext({
  isDark: '',
  savedVideos: [],
  addToSavedVideos: () => {},
  changeTheme: () => {},
})

export default ThemeContext

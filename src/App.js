import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import ThemeContext from './context/ThemeContext'

import Home from './components/Home'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import SavedVideos from './components/SavedVideos'

import VideoItemDetails from './components/VideoItemDetails'

import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: []}

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  addToSaveVideos = videoDetail => {
    const {savedVideosList} = this.state

    const isAlreadyIncluded =
      savedVideosList.filter(eachVideo => eachVideo.id === videoDetail.id)
        .length !== 0

    if (isAlreadyIncluded) {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.filter(
          eachSavedVideo => eachSavedVideo.id !== videoDetail.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoDetail],
      }))
    }
  }

  render() {
    const {isDark, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.onChangeTheme,
          savedVideosList,
          addToSaveVideos: this.addToSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path=".not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}
export default App

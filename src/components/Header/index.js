import {BsBrightnessHigh} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value

      const onLogout = () => {
        const {history} = props

        Cookies.remove('jwt_token')

        history.replace('/login')
      }

      const onChangeTheme = () => {
        changeTheme()
      }

      const backgroundColorChange = isDark ? 'dark' : ''

      const color = isDark ? 'white-color' : ''

      const websiteLogoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const themeChangeIcon = isDark ? (
        <BsBrightnessHigh className={`icons-headers ${color}`} />
      ) : (
        <FaMoon className={`icons-headers ${color}`} />
      )

      const logoutButtonClassName = isDark ? 'logout-dark' : 'logout-light'

      const popupContainerThemeChange = isDark ? 'darkTheme' : ''

      return (
        <nav className={`nav-container ${backgroundColorChange}`}>
          <Link to="/">
            <img
              src={websiteLogoUrl}
              className="website-logo"
              alt="website logo"
            />
          </Link>

          <div className="nav-container">
            <button
              type="button"
              onClick={onChangeTheme}
              data-testid="theme"
              className="theme-change-button"
            >
              {themeChangeIcon}
            </button>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              className="profile-img"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button className={logoutButtonClassName} type="button">
                  Logout
                </button>
              }
            >
              {close => (
                <div className={`popup-container ${popupContainerThemeChange}`}>
                  <p>Are you, sure you want to logout</p>
                  <div>
                    <button
                      className="btn cancel-button"
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn confirm-button"
                      type="button"
                      onClick={onLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)

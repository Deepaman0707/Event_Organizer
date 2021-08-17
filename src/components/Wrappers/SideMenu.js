import React from 'react'
import { startGetUserDetails } from './../../actions/user'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Popup from './Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
import UserDetailCard from '../UserDetails/UserDetailCard'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'
import { startLogout } from './../../actions/auth'
import { useSelector } from 'react-redux'
const drawerWidth = 73

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    backgroundColor: '#121212',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  drawerOpen: {
    background: '#36338E',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    background: '#36338E',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // overflowX: 'hidden',
    // width: theme.spacing(9) + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },

  title: {
    flexGrow: 1,
    color: '#fff',
    opacity: '87%',
  },

  icon: {
    fontSize: '25px',
    marginLeft: '10%',
    color: '#fff',
    opacity: '87%',
  },

  large: {
    width: '60px',
    height: '60px',
    alignSelf: 'center',
    fontSize: '30px',
    backgroundColor: 'black',
  },

  AddEvent: {
    marginTop: '20vh',
  },

  MyEvent: {
    marginTop: '2vh',
  },

  logout: {
    marginTop: '35vh',
  },

  iconBtn: {
    marginTop: '5vh',
    alignSelf: 'center',
  },

  username: {
    color: 'white',
    fontSize: '15px',
    marginTop: '70px',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
  },
}))

const SideMenu = ({ component: Component, logout }) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [openProfile, setOpenProfile] = React.useState(false)
  const [openForm, setOpenForm] = React.useState(false)
  const user = useSelector((state) => state.auth.user)

  const handleOpen = () => {
    setOpenForm(true)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const handleOpenProfile = () => {
    setOpenProfile(true)
  }

  const handleCloseProfile = () => {
    setOpenProfile(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar styles={classes.toolbar} variant='dense'>
          <IconButton
            aria-label='open drawer'
            onClick={() => {
              setOpen(!open)
            }}
            edge='start'
            className={classes.menuButton}
          >
            {!open ? (
              <MenuIcon className={classes.icon} />
            ) : (
              <ChevronLeftIcon className={classes.icon} />
            )}
          </IconButton>
          <Link to='/dashboard'>
            <Typography variant='h6' className={classes.title}>
              OCCASSIONALLY
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.iconBtn}>
          <IconButton onClick={handleOpenProfile}>
            <Avatar className={classes.large} alt='Remy Sharp'>
              {user.name === undefined ? 'A' : user.name.slice(0, 1)}
            </Avatar>
          </IconButton>
        </div>
        <Typography className={classes.username} variant='h4'>
          {user.name}
        </Typography>
        <List>
          <ListItem
            className={classes.AddEvent}
            button
            key={'AddEvent'}
            onClick={handleOpen}
          >
            <ListItemIcon>
              <AddIcon className={classes.icon} />
            </ListItemIcon>
          </ListItem>

          <Link to={`/me/events`}>
            <ListItem className={classes.MyEvent} button key={'MyEvent'}>
              <ListItemIcon>
                <FormatListBulletedIcon className={classes.icon} />
              </ListItemIcon>
            </ListItem>
          </Link>

          <ListItem
            className={classes.logout}
            button
            key={'LogOut'}
            onClick={logout}
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <Toolbar variant='dense' />
        <Component />
      </main>
      <Popup
        open={openForm}
        handleClose={handleClose}
        componenet={AddEventForm}
      />
      <Popup
        open={openProfile}
        handleClose={handleCloseProfile}
        componenet={UserDetailCard}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  user: state.user.user,
  userHandle: state.user.userHandle,
})
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(startLogout()),
    getUserDetails: (handle) => dispatch(startGetUserDetails(handle)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)

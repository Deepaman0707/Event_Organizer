import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import clsx from 'clsx'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Popup from './Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'

import UserDetails from '../UserDetails/UserDetails'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { Link } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { StarBorder } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import { startLogout } from './../../actions/auth'
import { connect } from 'react-redux'



const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listItemText: {
    fontSize: '15px',
    marginLeft: '15%',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    fontSize: '25px',
    marginLeft: '10%',
  },

  iconText: {
    fontSize: '20px',
  },

  large: {
    top: '5vh',
    width: theme.spacing(7),
    height: theme.spacing(7),
    alignSelf: 'center',
  },

  Profile: {
    top: '10vh',
    position: 'absolute',
    fontSize: '25px',
    alignContent: 'center',
  },

  AddEvent: {
    top: '37vh',
    position: 'relative',
  },

  MyEvent: {
    top: '38vh',
    position: 'relative',
  },

  nested: {
    top: '38vh',
    paddingLeft: theme.spacing(4),
  },

  logout: {
    top: '70vh',
    position: 'relative',
  },
}))

const SideMenu = ({ component: Component }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openForm, setOpenForm] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpenForm(true)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const [openDown, setOpenDown] = React.useState(false)

  const handleClick = () => {
    setOpenDown(!openDown)
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
        <Toolbar variant='dense'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            edge='start'
            className={classes.menuButton}
          >
            {!open ? (
              <MenuIcon className={classes.icon} />
            ) : (
              <ChevronLeftIcon className={classes.icon} />
            )}
          </IconButton>
          <Typography variant='h6' color='inherit' className={classes.title}>
            OCCASSIONALLY
          </Typography>
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
        <Toolbar variant='dense' />
        <Avatar
          alt='Remy Sharp'
          src='public\images\logo.png'                 // yaha userhandle ka image aayega
          className={classes.large}
        />

        <List>
          <ListItem className={classes.Profile} button key={'Profile'}>
            <ListItemIcon>                                                    
              <AccountCircleIcon className={classes.icon} />              
                                                                              
              {/* <Link to={`/event/${id}`}></Link> */}             
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={'Profile'}
            />
          </ListItem>

          <ListItem
            className={classes.AddEvent}
            button
            key={'AddEvent'}
            onClick={handleOpen}
          >
            <ListItemIcon>
              <AddIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={'Add Event'}
            />
          </ListItem>

          <ListItem
            className={classes.MyEvent}
            button
            key={'MyEvent'}
            onClick={handleClick}
          >
            <ListItemIcon>
              <FormatListBulletedIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={'My Event'}
            />
            {openDown ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openDown} timeout='auto' unmountOnExit>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <StarBorder className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary='Starred'
              />
            </ListItem>
          </Collapse>
            <ListItem
              className={classes.logout}
              button
              key={'LogOut'}
              onClick={Component.logout}      // yaha logout aayega link add kr rha tha nhi hua
            >
              <ListItemIcon>
                <ExitToAppIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={'Log Out'}
              />
            </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <Toolbar variant='dense' />
        <Component />
      </main>
      <Popup open={openForm} handleClose={handleClose} componenet={AddEventForm}/>
    </div>
  )
}


export default SideMenu

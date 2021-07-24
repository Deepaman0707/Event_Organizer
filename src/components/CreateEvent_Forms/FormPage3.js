import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const event = [
  { name: 'Event Name', desc: 'Event Description', fee: 'Fees' },
]

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

export default function FormPage3() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Event Summary
      </Typography>
      <List disablePadding>
        {event.map((event) => (
          <ListItem className={classes.listItem} key={event.name}>
            <ListItemText primary={event.name} secondary={event.desc} />
            <Typography variant='body2'>{event.fee}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}

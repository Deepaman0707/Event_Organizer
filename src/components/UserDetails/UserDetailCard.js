import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import TextInfoContent from '@mui-treasury/components/content/textInfo'
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog'
import Collapse from '@material-ui/core/Collapse'
import clsx from 'clsx'

import EditUserDetails from './EditUserDetails'
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over'
import { Typography } from '@material-ui/core'
import sample from '../../assets/empty.jpg'
import { auto } from 'async'
import { ThemeConsumer } from 'styled-components'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    marginTop: '20px',
    marginBottom: 0,
    width: 500,
    textAlign: 'center',
    padding: '20px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px',
  },
  textBtn: {
    fontSize: '10px',
  },
  content: {
    padding: 24,
  },
}))

export const UserDetailCard = React.memo(function BlogCard() {
  const classes = useStyles()
  const { button: buttonStyles, ...contentStyles } =
    useBlogTextInfoContentStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card elevation={0} className={classes.root}>
      <CardContent>
        <CardMedia image='src\assets\empty.jpg' />
        <Typography variant='h5' color='textSecondary' component='p'>
          User Image // yaha link daal dena
        </Typography>
        <Typography variant='h5' color='textSecondary' component='p'>
          User Handle // yaha link daal dena
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='outlined'
          color='primary'
          className={classes.editBtn}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <p className={classes.textBtn}> EDIT</p>
        </Button>
      </CardActions>
      <Collapse elevation={0} in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <EditUserDetails />
        </CardContent>
      </Collapse>
    </Card>
  )
})

export default UserDetailCard

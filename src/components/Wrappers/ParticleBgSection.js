import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ParticlesBg from 'particles-bg'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}))

const ParticleBgSection = ({ component: Component }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className={classes.heroContent}
        style={{ backgroundColor: 'transparent', position: 'relative' }}
      >
        <Container maxWidth='sm'>
          <Component />
          <ParticlesBg type='random' bg={true} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ParticleBgSection

import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import ErrorImage from '../../assets/error-image.png'
import { RouteProps } from 'react-router'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '12vw',
    },
    errorTitle: {
      fontWeight: 'bold',
    },
    refeshText: {
      fontWeight: 'normal',
      color: '#00008B',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  })

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode
}
class ErrorBoundary extends React.Component<Props & RouteProps, { hasErrored: boolean }> {
  constructor(props) {
    super(props)
    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  }

  componentDidCatch(error, info) {
    console.error(error)
  }

  render() {
    const { classes } = this.props
    if (this.state.hasErrored) {
      return (
        <Box className={classes.root}>
          <Box ml='100x'>
            <img src={ErrorImage} alt='Dog ate page' width='400px' />
          </Box>
          <Typography className={classes.errorTitle} variant='h3'>
            Maaf, Halaman kamu dimakan guguk
          </Typography>
          <Box mt='20px'>
            <Typography
              className={classes.refeshText}
              onClick={() => {
                window.location.reload()
                this.props.history.push('/login')
              }}
              variant='h6'
            >
              Kembali ke halaman login
            </Typography>
          </Box>
        </Box>
      )
    }
    return this.props.children
  }
}

export default withRouter(withStyles(styles)(ErrorBoundary))

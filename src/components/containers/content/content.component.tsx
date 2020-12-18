import React from 'react'
import routes from '../../../routes'
import { Route, Switch } from 'react-router-dom'
import { Fade } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'

const Content: React.FC<any> = () => {
  return (
    <div>
      <AnimatePresence>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <route.component {...props} />
                    </motion.div>
                  )}
                />
              )
            )
          })}

          {/* <Redirect from="/" to="/dashboard" /> */}
        </Switch>
      </AnimatePresence>
    </div>
  )
}

export default React.memo(Content)

import React, { Suspense } from 'react'
import routes from '../../../routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CircularLoading from '../../circular-loading/circular-loading.component'
import ErrorBoundary from '../../error-boundary/error-boundary.component'

const Content: React.FC<any> = () => {
  return (
    <AnimatePresence>
      <Suspense fallback={<CircularLoading />}>
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

          <Redirect from='/' to='/absensi' />
        </Switch>
      </Suspense>
    </AnimatePresence>
  )
}

export default React.memo(Content)

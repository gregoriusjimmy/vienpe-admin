import React from 'react'
import routes from '../../../routes'
import { Route, Switch } from 'react-router-dom'
import { Fade } from '@material-ui/core'

const Content: React.FC = () => {
  return (
    <div>
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
                  <Fade>
                    <route.component {...props} />
                  </Fade>
                )}
              />
            )
          )
        })}

        {/* <Redirect from="/" to="/dashboard" /> */}
      </Switch>
    </div>
  )
}

export default React.memo(Content)

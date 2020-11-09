import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../../routes';

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
                  // <CFade>
                  <route.component {...props} />
                  // </CFade>
                )}
              />
            )
          );
        })}

        {/* <Redirect from="/" to="/dashboard" /> */}
      </Switch>
    </div>
  );
};

export default React.memo(Content);

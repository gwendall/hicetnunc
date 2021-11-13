import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import HicetnuncContextProvider from './context/HicetnuncContext'
import { getInitialData } from './data/api'
import { Header } from './components/header'
import { Loading as Preloading } from './components/loading'
import { FeedbackComponent } from './components/feedback'
import { routes } from './routes'

const RedirectWarning = () => {
  React.useLayoutEffect(() => {
    if (window.location.host === 'hicetnunc.cc') {
      window.alert('You are viewing a mirror of the website hicetnunc.xyz. We are a community version, not the original one.');
    }
  }, []);
  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true)

  // 1st time loading the site ???
  useEffect(() => {
    getInitialData().then(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Preloading />
  }

  return (
    <HicetnuncContextProvider>
      <Header />
      <FeedbackComponent />
      <RedirectWarning />
      <Switch>
        {routes.map(({ exact, path, component: Comp }) => (
          <Route path={path} exact={exact} key={path} component={Comp} />
        ))}
      </Switch>
    </HicetnuncContextProvider>
  )
}

export default App

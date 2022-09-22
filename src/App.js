import { useState, useEffect, useMemo } from "react"

// react-router components
import { Route, Routes, useLocation } from "react-router-dom"

// @mui material components
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Icon from "@mui/material/Icon"
import routes from "routes"

// Apollo
// import { ApolloProvider } from 'react-apollo'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"

const client = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_BACKEND_URL }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
})

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />
      }

      return null
    })

  return (
    <ApolloProvider client={client}>
      <CssBaseline>
        <Routes>{getRoutes(routes)}</Routes>
      </CssBaseline>
    </ApolloProvider>
  )
}

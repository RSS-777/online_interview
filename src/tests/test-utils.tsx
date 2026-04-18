import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from '../store/settings/settingsSlice'

export function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      settings: settingsReducer,
    },
  })

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}
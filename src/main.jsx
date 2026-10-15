import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  fontFamily: 'Arial, Helvetica, sans-serif',
  primaryColor: 'violet',
  defaultRadius: 'md',
  colors: { violet: ['#f1efff', '#e3deff', '#c9bfff', '#ad9cf9', '#957def', '#8064e6', '#6e52d4', '#5a41b6', '#49359a', '#39297d'] },
  components: {
    Button: { defaultProps: { color: 'dark', radius: 'xl' } },
    TextInput: { defaultProps: { size: 'md', radius: 'md' } },
    Textarea: { defaultProps: { size: 'md', radius: 'md' } },
  },
})
createRoot(document.getElementById('root')).render(<StrictMode><MantineProvider theme={theme} forceColorScheme="light"><App /></MantineProvider></StrictMode>)

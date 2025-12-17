import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, Snackbar, Alert, ThemeProvider, createTheme } from '@mui/material'
import Dashboard from './components/Dashboard'
import TechnologyDetails from './components/TechnologyDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import useLocalStorage from './hooks/useLocalStorage'
import { AuthProvider } from './context/AuthContext'
import './App.css'

const initialTechnologies = [
  {
    id: 'react',
    title: 'React',
    level: 'junior',
    status: 'in-progress',
    category: 'frontend',
    notes: 'Изучаю хуки и маршрутизацию.',
  },
  {
    id: 'node',
    title: 'Node.js',
    level: 'middle',
    status: 'planned',
    category: 'backend',
    notes: 'Нужно пройти по Express и JWT.',
  },
  {
    id: 'design',
    title: 'UI/UX',
    level: 'junior',
    status: 'done',
    category: 'design',
    notes: 'Базовые гайды по Material Design.',
  },
]

function App() {
  const [technologies, setTechnologies] = useLocalStorage('tech-tracker', initialTechnologies)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#1976d2' },
          secondary: { main: '#455a64' },
        },
      }),
    [],
  )

  const handleAdd = (item) => {
    setTechnologies((prev) => [...prev, { ...item, id: crypto.randomUUID() }])
    setSnackbar({ open: true, message: 'Технология добавлена', severity: 'success' })
  }

  const handleUpdate = (id, patch) => {
    setTechnologies((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
    setSnackbar({ open: true, message: 'Данные обновлены', severity: 'info' })
  }

  const handleRemove = (id) => {
    setTechnologies((prev) => prev.filter((t) => t.id !== id))
    setSnackbar({ open: true, message: 'Технология удалена', severity: 'warning' })
  }

  const handleImport = (items) => {
    const sanitized = Array.isArray(items)
      ? items
          .filter((item) => item?.title)
          .map((item) => ({
            id: item.id || crypto.randomUUID(),
            title: item.title,
            level: item.level || 'junior',
            status: item.status || 'planned',
            category: item.category || 'other',
            notes: item.notes || '',
          }))
      : []
    setTechnologies(sanitized)
    setSnackbar({ open: true, message: 'Данные импортированы', severity: 'success' })
  }

  const handleExport = () => JSON.stringify(technologies, null, 2)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      technologies={technologies}
                      onAdd={handleAdd}
                      onUpdate={handleUpdate}
                      onRemove={handleRemove}
                      onImport={handleImport}
                      onExport={handleExport}
                      onNotify={setSnackbar}
                    />
                  }
                />
                <Route
                  path="/dashboard/technology/:id"
                  element={<TechnologyDetails technologies={technologies} onUpdate={handleUpdate} />}
                />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default App

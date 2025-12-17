import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const ok = login(form.username.trim(), form.password.trim())
    if (!ok) {
      setError('Неверные данные (admin / password)')
      return
    }
    const redirectTo = location.state?.from?.pathname || '/dashboard'
    navigate(redirectTo, { replace: true })
  }

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
    return null
  }

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Вход</Typography>
          <TextField
            required
            label="Логин"
            name="username"
            value={form.username}
            onChange={handleChange}
            aria-label="Логин"
            autoComplete="username"
          />
          <TextField
            required
            type="password"
            label="Пароль"
            name="password"
            value={form.password}
            onChange={handleChange}
            aria-label="Пароль"
            autoComplete="current-password"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained">
            Войти
          </Button>
          <Typography variant="body2" color="text.secondary">
            Тестовые данные: admin / password
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Login



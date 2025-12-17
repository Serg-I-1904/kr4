import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const currentTab = location.pathname.startsWith('/dashboard') ? '/dashboard' : false

  const handleChange = (_event, value) => {
    if (value) {
      navigate(value)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Трекер изучения технологий
          </Typography>
          <Tabs value={currentTab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Дашборд" value="/dashboard" />
          </Tabs>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {user?.name || 'Гость'}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 3 }}>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default Layout


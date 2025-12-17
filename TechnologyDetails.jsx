import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'

function TechnologyDetails({ technologies, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const tech = technologies.find((item) => item.id === id)

  useEffect(() => {
    document.title = tech ? `${tech.title} — детали` : 'Технология не найдена'
  }, [tech])

  useEffect(() => {
    if (!tech) {
      navigate('/dashboard', { replace: true })
    }
  }, [tech, navigate])

  if (!tech) return null

  const toggleStatus = () => {
    onUpdate(tech.id, { status: tech.status === 'done' ? 'in-progress' : 'done' })
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5">{tech.title}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={`Уровень: ${tech.level}`} />
          <Chip label={`Категория: ${tech.category}`} />
          <Chip label={`Статус: ${tech.status}`} color={tech.status === 'done' ? 'success' : 'primary'} />
        </Stack>
        <Typography variant="body1">{tech.notes || 'Описание отсутствует'}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={toggleStatus}>
            {tech.status === 'done' ? 'Вернуть в работу' : 'Отметить готовой'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Назад к списку
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default TechnologyDetails



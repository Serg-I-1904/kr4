import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'

function TechnologyCard({ tech, onRemove, onUpdate }) {
  const navigate = useNavigate()

  const toggleStatus = () => {
    const nextStatus = tech.status === 'done' ? 'planned' : 'done'
    onUpdate(tech.id, { status: nextStatus })
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">{tech.title}</Typography>
          <Chip label={tech.status === 'done' ? 'Завершено' : 'Активно'} color={tech.status === 'done' ? 'success' : 'primary'} />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip label={tech.level} variant="outlined" />
          <Chip label={tech.category} variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {tech.notes || 'Без заметок'}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button size="small" onClick={() => navigate(`/dashboard/technology/${tech.id}`)}>
            Подробнее
          </Button>
          <Button size="small" onClick={toggleStatus}>
            {tech.status === 'done' ? 'Вернуть в план' : 'Отметить выполненной'}
          </Button>
          <Button size="small" color="error" onClick={() => onRemove(tech.id)}>
            Удалить
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default TechnologyCard



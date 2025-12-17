import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const defaultForm = {
  title: '',
  level: 'junior',
  status: 'planned',
  category: 'frontend',
  notes: '',
}

function TechnologyForm({ onSubmit, initialData }) {
  const [values, setValues] = useState(initialData || defaultForm)
  const [error, setError] = useState('')

  useEffect(() => {
    setValues(initialData || defaultForm)
  }, [initialData])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!values.title.trim()) {
      setError('Название обязательно')
      return
    }
    onSubmit(values)
    setValues(defaultForm)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <Stack spacing={2}>
        <Typography variant="h6">Добавить технологию</Typography>

        <TextField
          required
          label="Название"
          name="title"
          value={values.title}
          onChange={handleChange}
          aria-label="Название технологии"
          error={Boolean(error)}
          helperText={error}
        />

        <FormControl fullWidth>
          <InputLabel id="level-label">Уровень</InputLabel>
          <Select
            labelId="level-label"
            label="Уровень"
            name="level"
            value={values.level}
            onChange={handleChange}
            aria-label="Уровень владения"
          >
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="middle">Middle</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="status-label">Статус</InputLabel>
          <Select
            labelId="status-label"
            label="Статус"
            name="status"
            value={values.status}
            onChange={handleChange}
            aria-label="Статус изучения"
          >
            <MenuItem value="planned">Запланировано</MenuItem>
            <MenuItem value="in-progress">В процессе</MenuItem>
            <MenuItem value="done">Завершено</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            label="Категория"
            name="category"
            value={values.category}
            onChange={handleChange}
            aria-label="Категория"
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="devops">DevOps</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="other">Другое</MenuItem>
          </Select>
        </FormControl>

        <TextField
          multiline
          minRows={3}
          label="Заметки"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          aria-label="Заметки"
        />

        <Button variant="contained" type="submit" aria-label="Сохранить технологию">
          Сохранить
        </Button>
      </Stack>
    </Box>
  )
}

export default TechnologyForm



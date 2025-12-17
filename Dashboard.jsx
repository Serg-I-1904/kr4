import { useMemo, useState } from 'react'
import { Box, Grid, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import TechnologyForm from './TechnologyForm'
import TechnologyCard from './TechnologyCard'
import JsonImportExport from './JsonImportExport'

const categories = ['all', 'frontend', 'backend', 'devops', 'design', 'other']

function Dashboard({ technologies, onAdd, onUpdate, onRemove, onImport, onExport, onNotify }) {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? technologies : technologies.filter((tech) => tech.category === filter)),
    [filter, technologies],
  )

  const stats = useMemo(
    () => ({
      total: technologies.length,
      done: technologies.filter((t) => t.status === 'done').length,
      active: technologies.filter((t) => t.status === 'in-progress').length,
      planned: technologies.filter((t) => t.status === 'planned').length,
    }),
    [technologies],
  )

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
          <Typography variant="h5">Дашборд</Typography>
          <Typography variant="body2" color="text.secondary">
            Всего: {stats.total} • В процессе: {stats.active} • Запланировано: {stats.planned} • Готово: {stats.done}
          </Typography>
        </Stack>
      </Paper>

      <TechnologyForm onSubmit={onAdd} />

      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Tabs
            value={filter}
            onChange={(_e, val) => setFilter(val)}
            variant="scrollable"
            aria-label="Фильтр по категориям"
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>

          <JsonImportExport onImport={onImport} onExport={onExport} onNotify={onNotify} />

          <Box>
            {filtered.length === 0 ? (
              <Typography color="text.secondary">Нет элементов для отображения.</Typography>
            ) : (
              <Grid container spacing={2}>
                {filtered.map((tech) => (
                  <Grid item xs={12} sm={6} key={tech.id}>
                    <TechnologyCard tech={tech} onRemove={onRemove} onUpdate={onUpdate} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Dashboard



import { useRef } from 'react'
import { Button, Stack, Typography } from '@mui/material'

function JsonImportExport({ onImport, onExport, onNotify }) {
  const fileInputRef = useRef(null)

  const handleExport = () => {
    const data = onExport()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'technologies.json'
    link.click()
    URL.revokeObjectURL(url)
    onNotify?.({ open: true, message: 'Экспорт выполнен', severity: 'success' })
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        onImport(parsed)
      } catch (err) {
        onNotify?.({ open: true, message: 'Ошибка импорта: некорректный JSON', severity: 'error' })
      } finally {
        event.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1">Импорт / экспорт JSON</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
          Импортировать
        </Button>
        <Button variant="contained" onClick={handleExport}>
          Экспортировать
        </Button>
      </Stack>
      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleImport}
        aria-label="Импорт JSON"
      />
    </Stack>
  )
}

export default JsonImportExport



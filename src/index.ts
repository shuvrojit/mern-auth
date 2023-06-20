import app from "./server"

const PORT: number = 8000 || process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`)
})

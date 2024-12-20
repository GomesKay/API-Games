import fastify from "fastify"
import { routes } from "../routes/routes"

const app = fastify()

// Rotas
app.register(routes)

// Servidor
app
  .listen({ port: 3333 })
  .then(() => {
    console.log("🚀 HTTP Server Running!")
  })
  .catch(error => {
    console.error("Error Starting Server: ", error)
  })

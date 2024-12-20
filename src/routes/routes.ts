import type { FastifyInstance } from "fastify"
import { GameController } from "../controllers/controller"

export async function routes(app: FastifyInstance) {
  const controller = GameController()

  // Rotas + Controllers
  await app.get("/games", controller.getAll)
  await app.get("/games/:id", controller.getById)
  await app.get("/games/liked", controller.getByLiked)
  await app.post("/games", controller.create)
  await app.put("/games/:id", controller.update)
  await app.patch("/games/:id/liked", controller.updateLike)
  await app.delete("/games/:id", controller.delete)
}

import { z } from "zod"
import { GameModel } from "../models/model"

export function GameService() {
  const bodyGameSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    platforms: z.string().optional(),
    genre: z.string(),
    price: z.number(),
    releaseYear: z
      .union([z.string(), z.date()])
      .transform(value =>
        typeof value === "string" ? new Date(value) : value
      ),
  })

  type GameData = z.infer<typeof bodyGameSchema>

  return {
    getAll: () => GameModel.findMany(),
    getById: (id: string) => GameModel.findUnique({ where: { id } }),
    getByLiked: () => {
      const gameLiked = GameModel.findMany({
        where: { liked: true },
      })

      if (!gameLiked) {
        throw new Error("Game não encontrado")
      }

      return gameLiked
    },
    create: (data: GameData) => {
      const validatedData = bodyGameSchema.parse(data)
      return GameModel.create({ data: validatedData })
    },
    update: (id: string, data: GameData) =>
      GameModel.update({ where: { id }, data }),
    updateLike: async (id: string) => {
      const game = await GameModel.findUnique({ where: { id } })

      if (!game) {
        throw new Error("Game não encontrado")
      }

      return GameModel.update({
        where: { id },
        data: { liked: true },
      })
    },
    delete: (id: string) => GameModel.delete({ where: { id } }),
  }
}

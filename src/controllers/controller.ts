import { z } from "zod"
import { GameService } from "../services/service"
import type { FastifyReply, FastifyRequest } from "fastify"

export function GameController() {
  const service = GameService()

  // Schemas
  const paramsGameSchema = z.object({
    id: z.string().cuid(),
  })

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

  return {
    // Retorna todos os jogos
    getAll: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const games = await service.getAll()

        return reply.status(200).send(games)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao buscar jogos", error })
      }
    },

    // Retorna apenas um jogo específico
    getById: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = paramsGameSchema.parse(request.params)
        const game = await service.getById(id)

        if (!game) {
          return reply.status(404).send({ message: "Jogo não encontrado" })
        }

        return reply.status(200).send(game)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao buscar o jogo", error })
      }
    },

    // Retorna apenas jogos com like
    getByLiked: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const gameLiked = await service.getByLiked()

        if (!gameLiked) {
          return reply.status(404).send({ message: "Jogo não encontrado" })
        }

        return reply.status(200).send(gameLiked)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao buscar jogos curtidos", error })
      }
    },

    // Cria um novo jogo
    create: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = bodyGameSchema.parse(request.body)
        const gameCreated = await service.create(data)

        return reply.status(201).send(gameCreated)
      } catch (error) {
        return reply.status(500).send({ message: "Erro ao criar jogo", error })
      }
    },

    // Atualiza um jogo específico
    update: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = paramsGameSchema.parse(request.params)
        const data = bodyGameSchema.parse(request.body)
        const gameUpdated = await service.update(id, data)

        return reply.status(200).send(gameUpdated)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao atualizar jogo", error })
      }
    },

    // Atualiza jogo com like
    updateLike: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = paramsGameSchema.parse(request.params)
        const gameUpdatedLike = await service.updateLike(id)

        return reply.status(200).send(gameUpdatedLike)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao atualizar curtida do jogo", error })
      }
    },

    // Delete um jogo específico
    delete: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = paramsGameSchema.parse(request.params)
        const gameDeleted = await service.delete(id)

        return reply.status(200).send(gameDeleted)
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Erro ao deletar jogo", error })
      }
    },
  }
}

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "platforms" TEXT,
    "genre" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "releaseYear" TIMESTAMP(3) NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

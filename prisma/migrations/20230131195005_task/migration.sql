-- CreateTable
CREATE TABLE "responsavel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dia" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responsavel_email_key" ON "responsavel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_responsavelId_key" ON "sessions"("responsavelId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "responsavel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "responsavel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

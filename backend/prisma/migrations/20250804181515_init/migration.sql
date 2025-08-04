-- CreateTable
CREATE TABLE "public"."Drone" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Drone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "destino" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "prioridade" INTEGER NOT NULL,
    "entregue" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Entrega" (
    "id" SERIAL NOT NULL,
    "droneId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_pedidoId_key" ON "public"."Entrega"("pedidoId");

-- AddForeignKey
ALTER TABLE "public"."Entrega" ADD CONSTRAINT "Entrega_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "public"."Drone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrega" ADD CONSTRAINT "Entrega_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

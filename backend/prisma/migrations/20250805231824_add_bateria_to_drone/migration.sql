/*
  Warnings:

  - The values [DISPONIVEL] on the enum `DroneStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `destino` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `x` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DroneStatus_new" AS ENUM ('IDLE', 'CARREGANDO', 'EM_VOO', 'ENTREGANDO', 'RETORNANDO', 'MANUTENCAO');
ALTER TABLE "public"."Drone" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Drone" ALTER COLUMN "status" TYPE "public"."DroneStatus_new" USING ("status"::text::"public"."DroneStatus_new");
ALTER TYPE "public"."DroneStatus" RENAME TO "DroneStatus_old";
ALTER TYPE "public"."DroneStatus_new" RENAME TO "DroneStatus";
DROP TYPE "public"."DroneStatus_old";
ALTER TABLE "public"."Drone" ALTER COLUMN "status" SET DEFAULT 'IDLE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Drone" ADD COLUMN     "bateria" INTEGER NOT NULL DEFAULT 100,
ALTER COLUMN "status" SET DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE "public"."Pedido" DROP COLUMN "destino",
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;

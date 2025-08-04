/*
  Warnings:

  - The `status` column on the `Drone` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."DroneStatus" AS ENUM ('DISPONIVEL', 'EM_VOO', 'MANUTENCAO');

-- AlterTable
ALTER TABLE "public"."Drone" DROP COLUMN "status",
ADD COLUMN     "status" "public"."DroneStatus" NOT NULL DEFAULT 'DISPONIVEL';

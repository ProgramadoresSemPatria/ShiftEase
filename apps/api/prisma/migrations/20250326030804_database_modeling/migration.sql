/*
  Warnings:

  - Added the required column `department_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('FUNCIONARIO', 'GESTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "shift_exchange_status" AS ENUM ('PENDENTE', 'APROVADO_RECEPTOR', 'APROVADO_GESTOR', 'REJEITADO');

-- CreateEnum
CREATE TYPE "week_days" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "shift_types" AS ENUM ('DIURNO', 'NOTURNO');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "department_id" UUID NOT NULL,
ADD COLUMN     "role_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" "user_roles" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shifts" (
    "id" UUID NOT NULL,
    "department_id" UUID NOT NULL,
    "tipo" "shift_types" NOT NULL,

    CONSTRAINT "shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_shifts" (
    "id" UUID NOT NULL,
    "schedule_id" UUID NOT NULL,
    "shift_id" UUID NOT NULL,
    "dia_semana" "week_days" NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift_exchange_requests" (
    "id" UUID NOT NULL,
    "applicant_id" UUID NOT NULL,
    "receptor_id" UUID NOT NULL,
    "department_id" UUID NOT NULL,
    "status" "shift_exchange_status" NOT NULL DEFAULT 'PENDENTE',
    "origin_shift_id" UUID NOT NULL,
    "destination_id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "motivo" TEXT,

    CONSTRAINT "shift_exchange_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_codigo_key" ON "departments"("codigo");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shifts" ADD CONSTRAINT "shifts_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_shifts" ADD CONSTRAINT "schedule_shifts_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_shifts" ADD CONSTRAINT "schedule_shifts_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_origin_shift_id_fkey" FOREIGN KEY ("origin_shift_id") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_exchange_requests" ADD CONSTRAINT "shift_exchange_requests_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

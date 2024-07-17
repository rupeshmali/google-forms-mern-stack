/*
  Warnings:

  - A unique constraint covering the columns `[form_uuid]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `form_uuid` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "form_uuid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Response" (
    "response_id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "response_data" JSONB NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("response_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_form_uuid_key" ON "Form"("form_uuid");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE RESTRICT ON UPDATE CASCADE;

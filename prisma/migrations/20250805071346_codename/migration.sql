/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `ShortUrl` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ShortUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ShortUrl" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_code_key" ON "public"."ShortUrl"("code");

/*
  Warnings:

  - You are about to drop the column `categoria` on the `progetto` table. All the data in the column will be lost.
  - You are about to drop the column `priorita` on the `progetto` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Progetto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progetto` DROP COLUMN `categoria`,
    DROP COLUMN `priorita`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `priorita` VARCHAR(191) NOT NULL,
    `progettoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Progetto` ADD CONSTRAINT `Progetto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_progettoId_fkey` FOREIGN KEY (`progettoId`) REFERENCES `Progetto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

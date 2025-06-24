/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `progetto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `progetto` DROP FOREIGN KEY `Progetto_categoriaId_fkey`;

-- DropIndex
DROP INDEX `Progetto_categoriaId_fkey` ON `progetto`;

-- AlterTable
ALTER TABLE `progetto` DROP COLUMN `categoriaId`;

-- CreateTable
CREATE TABLE `_CategoriaProgetto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaProgetto_AB_unique`(`A`, `B`),
    INDEX `_CategoriaProgetto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoriaProgetto` ADD CONSTRAINT `_CategoriaProgetto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaProgetto` ADD CONSTRAINT `_CategoriaProgetto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

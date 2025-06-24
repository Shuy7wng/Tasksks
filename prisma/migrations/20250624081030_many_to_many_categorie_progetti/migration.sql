/*
  Warnings:

  - You are about to drop the `_categoriaprogetto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categoriaprogetto` DROP FOREIGN KEY `_CategoriaProgetto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categoriaprogetto` DROP FOREIGN KEY `_CategoriaProgetto_B_fkey`;

-- DropTable
DROP TABLE `_categoriaprogetto`;

-- CreateTable
CREATE TABLE `_ProgettiPerCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProgettiPerCategoria_AB_unique`(`A`, `B`),
    INDEX `_ProgettiPerCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProgettiPerCategoria` ADD CONSTRAINT `_ProgettiPerCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgettiPerCategoria` ADD CONSTRAINT `_ProgettiPerCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

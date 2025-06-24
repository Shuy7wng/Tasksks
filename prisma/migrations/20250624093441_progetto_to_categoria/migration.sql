/*
  Warnings:

  - You are about to drop the `_progettipercategoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_progettipercategoria` DROP FOREIGN KEY `_ProgettiPerCategoria_A_fkey`;

-- DropForeignKey
ALTER TABLE `_progettipercategoria` DROP FOREIGN KEY `_ProgettiPerCategoria_B_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_progettoId_fkey`;

-- DropIndex
DROP INDEX `Task_progettoId_fkey` ON `task`;

-- DropTable
DROP TABLE `_progettipercategoria`;

-- CreateTable
CREATE TABLE `_CategoriaToProgetto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToProgetto_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToProgetto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_progettoId_fkey` FOREIGN KEY (`progettoId`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToProgetto` ADD CONSTRAINT `_CategoriaToProgetto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToProgetto` ADD CONSTRAINT `_CategoriaToProgetto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `Categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Progetto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `priorita` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `progettoId` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `_CategoriaToProgetto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    UNIQUE INDEX `_CategoriaToProgetto_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToProgetto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Task` ADD CONSTRAINT `Task_progettoId_fkey` FOREIGN KEY (`progettoId`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_CategoriaToProgetto` ADD CONSTRAINT `_CategoriaToProgetto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_CategoriaToProgetto` ADD CONSTRAINT `_CategoriaToProgetto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Progetto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

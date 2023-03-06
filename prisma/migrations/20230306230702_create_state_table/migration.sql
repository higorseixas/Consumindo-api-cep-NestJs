-- CreateTable
CREATE TABLE `State` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uf` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `localidade` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `State_uf_key`(`uf`),
    UNIQUE INDEX `State_estado_key`(`estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

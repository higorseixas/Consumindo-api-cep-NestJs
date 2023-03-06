-- CreateTable
CREATE TABLE `Cep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `localidade` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `ibge` VARCHAR(191) NOT NULL,
    `gia` VARCHAR(191) NOT NULL,
    `ddd` VARCHAR(191) NOT NULL,
    `siafi` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cep_cep_key`(`cep`),
    UNIQUE INDEX `Cep_uf_key`(`uf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

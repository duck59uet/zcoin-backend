import { MigrationInterface, QueryRunner } from "typeorm"

export class init1719214678993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP,
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "wallet" character varying NOT NULL, 
            "avatar" character varying, 
            "nonce" bigint, 
            CONSTRAINT "UQ_c5a97c2e62b0c759e2c16d411cd" UNIQUE ("wallet"), 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
            CREATE TABLE "orders" (
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "deletedAt" TIMESTAMP, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "baseAmount" bigint NOT NULL, 
            "memeAmount" bigint NOT NULL, 
            "price" real NOT NULL, 
            "userId" character varying NOT NULL, 
            "collection" character varying NOT NULL, 
            "txHash" character varying, 
            "type" character varying NOT NULL, 
            CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
                CREATE TABLE "collections" (
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "deletedAt" TIMESTAMP, 
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "coinMetadata" character varying, 
                "logoUri" character varying NOT NULL, 
                "name" character varying NOT NULL, 
                "owner" character varying, 
                "projectUri" character varying NOT NULL, 
                "description" character varying, 
                "symbol" character varying, 
                "raw_id" character varying, 
                "txHash" character varying, 
                "status" integer, 
                "twitter" character varying, 
                "telegram" character varying, 
                CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
            CREATE TABLE "system_configs" (
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "deletedAt" TIMESTAMP, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "key" character varying NOT NULL, 
            "data" jsonb, 
            CONSTRAINT "PK_29ac548e654c799fd885e1b9b71" PRIMARY KEY ("id"))`);

        await queryRunner.query(`
            CREATE TABLE "comments" (
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "deletedAt" TIMESTAMP, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "userId" character varying, 
            "collectionId" character varying, 
            "imageUri" character varying, 
            "description" character varying NOT NULL, 
            "like" integer NOT NULL, 
            "mentionId" character varying, 
            CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);

        await queryRunner.query(` 
            CREATE TABLE "comment_likes" (
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "deletedAt" TIMESTAMP, 
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "userId" character varying, 
            "commentId" character varying, 
            CONSTRAINT "PK_2c299aaf1f903c45ee7e6c7b419" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "system_configs"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comment_likes"`);
    }

}

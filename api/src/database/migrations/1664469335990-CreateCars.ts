import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1664469335990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: "car",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "image_url",
                    type: "varchar"
                },
                {
                  name: "image_description",
                  type: "varchar"
                },
                {
                  name: "alcohol_consumption",
                  type: "float"
                },
                {
                  name: "gas_consumption",
                  type: "float"
                },
                {
                  name: "user_id",
                  type: "uuid"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                  name: "update_at",
                  type: "timestamp",
                  default: "now()"
              },
            ],
            foreignKeys: [
              {
                name: 'FKUserCar',
                referencedTableName: 'user',
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "Cascade"
              }
            ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("car")
    }

}

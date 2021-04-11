import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1618177524492 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()'
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'NOW()'
          }
        ]
      })
    )
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
    
}
    
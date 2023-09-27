import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class PostSlugUpdate1695045827208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "product",
      new TableColumn({
        name: "slug",
        type: "text"
        // default: "default-slug"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("product", "slug");
  }
}

// import {
//   //   MigrationInterface,
//   //   QueryRunner,
//   Table,
//   TableIndex,
//   TableColumn,
//   TableForeignKey
// } from 'typeorm';

// export class QuestionRefactoringTIMESTAMP implements MigrationInterface {
//   async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'question',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true
//           },
//           {
//             name: 'name',
//             type: 'varchar'
//           }
//         ]
//       }),
//       true
//     );

//     await queryRunner.createIndex(
//       'question',
//       new TableIndex({
//         name: 'IDX_QUESTION_NAME',
//         columnNames: ['name']
//       })
//     );

//     await queryRunner.createTable(
//       new Table({
//         name: 'answer',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true
//           },
//           {
//             name: 'name',
//             type: 'varchar'
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()'
//           }
//         ]
//       }),
//       true
//     );

//     await queryRunner.addColumn(
//       'answer',
//       new TableColumn({
//         name: 'questionId',
//         type: 'int'
//       })
//     );

//     await queryRunner.createForeignKey(
//       'answer',
//       new TableForeignKey({
//         columnNames: ['questionId'],
//         referencedColumnNames: ['id'],
//         referencedTableName: 'question',
//         onDelete: 'CASCADE'
//       })
//     );
//   }

//   async down(queryRunner: QueryRunner): Promise<void> {
//     const table = await queryRunner.getTable('answer');
//     const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('questionId') !== -1);
//     await queryRunner.dropForeignKey('answer', foreignKey);
//     await queryRunner.dropColumn('answer', 'questionId');
//     await queryRunner.dropTable('answer');
//     await queryRunner.dropIndex('question', 'IDX_QUESTION_NAME');
//     await queryRunner.dropTable('question');
//   }
// }

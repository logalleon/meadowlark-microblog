import { Fieldable, DefaultConnection, DefaultTablesFieldable } from '../../Interfaces';
import Sequelize, { DefineAttributes, DataTypes, DefineOptions, DefineIndexesOptions } from 'sequelize';

interface EntityTypeDefineOptions {
  indexes: DefineIndexesOptions
}

interface EntityTypeAttributes {
  id: number
}

interface EntityLinks {
  editEntityLink: string,
  manageFieldsLink: string
  manageFieldsDisplayLink?: string,
  deleteEntityLink?: string
}

type EntityTypeModel = EntityTypeAttributes & Fieldable & DefineAttributes;
type RenderableEntityType = EntityLinks & EntityTypeModel;

class EntityType implements Fieldable {

  public static tableName: string = 'entity_type';

  public label: string;
  public machineName: string;

  public static defaultAttributes: DefineAttributes = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    label: {
      type: Sequelize.STRING
    },
    machineName: {
      type: Sequelize.STRING,
      unique: true
    }
  }

  constructor (props: any, fieldable: Fieldable) {
    this.label = fieldable.label;
    this.machineName = fieldable.machineName;
  }

  static async defineTables (connection: Sequelize.Sequelize): Promise<boolean|Error> {
    return new Promise<boolean|Error>((resolve, reject) => {
      const { tableName: name } = EntityType;
      const attributes = Object.assign({}, EntityType.defaultAttributes);
      const options: DefineOptions<EntityTypeDefineOptions> = {
        indexes: [
          {
            unique: true,
            fields: [ 'machineName' ]
          }
        ]
      }
      connection.define(
        name,
        attributes,
        options
      ).sync()
      .then(() => {
        resolve(true);
      })
      .catch((e: Error) => {
        reject(e);
      });
    });
  }

  async create (connection: Sequelize.Sequelize): Promise<boolean|Error> {
    return new Promise<boolean|Error>((resolve, reject) => {
      const { tableName } = EntityType;
      connection.model(tableName).create({
        machineName: this.machineName,
        label: this.label
      }).then(() => {
        resolve(true);
      }).catch((e: Error) => {
        reject(e);
      });
    });
  }

  static async findAllOfType (connection: Sequelize.Sequelize, machineName: string): Promise<EntityTypeModel[]> {
    return new Promise<EntityTypeModel[]>((resolve, reject) => {
      connection.model(machineName).findAll()
        .then((models: EntityTypeModel[]) => {
          resolve(models);
        })
        .catch((e) => { // @TODO this
          console.log(e);
          resolve(<EntityTypeModel[]>[]);
        });
    })
  }

  static async findAll (connection: Sequelize.Sequelize): Promise<EntityTypeModel[]> {
    return new Promise<EntityTypeModel[]>((resolve, reject) => {
      connection.model(this.tableName).findAll()
        .then((models: EntityTypeModel[]) => {
          resolve(models);
        })
        .catch((e) => { // @TODO this
          console.log(e);
          resolve(<EntityTypeModel[]>[]);
        });
    })
  }

}

export default EntityType;
export { EntityTypeModel, RenderableEntityType };
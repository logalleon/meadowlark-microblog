import { Fieldable, Type, ConnectableFieldable, DefaultConnection } from '../../Interfaces';
import Sequelize, { DefineAttributes } from 'sequelize';

interface Props {
  relation: Fieldable,
  type: Type
}

type FieldInterface = Fieldable & Props;

class Field implements Fieldable {

  public label: string;
  public machineName: string;

  public relation: Fieldable;
  public type: Type;

  public connection: any;

  public static tableName: string = 'field';

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

  constructor (props: Props, fieldable: Fieldable, connection: Sequelize.Sequelize) {
    this.relation = props.relation;
    this.type = props.type;
    this.label = fieldable.label;
    this.machineName = fieldable.machineName;
    this.connection = connection;
  }

  sync (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public static defineTables () {
    
  }

}

export default Field;
import { Fieldable, Type } from '../../Interfaces';
import { Sequelize } from 'sequelize';

interface Props {
  relation: Fieldable,
  type: Type
}

type FieldInterface = Fieldable & Props;

class Field implements FieldInterface {

  public label: string;
  public machineName: string;

  public relation: Fieldable;
  public type: Type;

  public connection: any;

  constructor (props: Props, fieldable: Fieldable, connection: Sequelize) {
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

}
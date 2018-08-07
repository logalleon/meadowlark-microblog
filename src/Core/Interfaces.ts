import { Sequelize, DefineAttributes } from 'sequelize';

interface Fieldable {
  label: string,
  machineName: string
}

enum Type {
  STRING,
  NUMBER,
  DECIMAL,
  REFERENCE
}

interface Connectable {
  connection: Sequelize
}

interface DefaultTables {
  defaultAttributes: DefineAttributes,
  defineTables (): Promise<boolean|Error>
}

type ConnectableFieldable = Fieldable & Connectable;

type DefaultConnection = ConnectableFieldable & DefaultTables;

type DefaultTablesFieldable = Fieldable & DefaultTables;


export { Fieldable, Type, Connectable, ConnectableFieldable, DefaultConnection, DefaultTablesFieldable }
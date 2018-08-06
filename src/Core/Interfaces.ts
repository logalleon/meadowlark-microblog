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

export { Fieldable, Type }
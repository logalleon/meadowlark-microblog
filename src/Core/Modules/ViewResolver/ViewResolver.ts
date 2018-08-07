import { snakeCase, kebabCase, lowerCase } from 'lodash';
import EntityType from '../Entity/EntityType';
import Field from '../Field/Field';

enum Domains {
  ADMIN = 'admin',
  PUBLIC = 'public'
}

enum ViewStructures {
  FORM = 'form',
  VIEW = 'view'
}

enum ViewVariations {
  CREATE = 'create',
  EDIT = 'edit',
}

enum ViewEntityRelation {
  ENTITY_TYPE,
  FIELD
}

interface ViewResolverOptions {
  domain: Domains,
  structure: ViewStructures,
  variation?: ViewVariations,
  target: string,
  relation?: ViewEntityRelation
  extension?: string
  includeExtension?: boolean
}

interface ParameterPathOptions {
  domain: Domains,
  relation?: boolean
  variation?: ViewVariations
}

class ViewResolver {

  private structureDelimiter = '__';
  private variantDelimiter = '--';

  private defaultExtension: string = '.ejs';

  constructor () {

  }

  resolvePath (options: ViewResolverOptions): string {
    const { domain, structure, variation, target, extension, includeExtension } = options;
    let resolved: string = `./${domain}/${domain}${this.structureDelimiter}${structure}`; // @TODO path consistency
    resolved += variation ? `${this.variantDelimiter}${variation}` : '';
    resolved += `${this.structureDelimiter}${snakeCase(target)}`;
    resolved += includeExtension ? `${extension || this.defaultExtension}` : '';
    return resolved;
  }

  resolveUrlPath (options: ViewResolverOptions): string {
    const { domain, structure, variation, target, relation } = options;
    let resolved: string = `/${domain}/${structure}/${kebabCase(lowerCase(target))}`;
    resolved += relation ? `/${kebabCase(this.getRelationPath(relation))}` : '';
    resolved += variation ? `/${variation}` : '';
    return resolved;
  }

  resolveParameterUrlPath (options: ParameterPathOptions): string {
    const { domain, relation, variation } = options;
    let resolved: string = `/${domain}/:structure/:target`;
    resolved += relation ? `/:relation` : '';
    resolved += variation ? `/${variation}` : '';
    return resolved;
  }

  getRelationPath (relation: ViewEntityRelation): string {
    switch (relation) {
      case ViewEntityRelation.ENTITY_TYPE:
        return EntityType.tableName;
      case ViewEntityRelation.FIELD:
        return Field.tableName;
    }
  }

}

export default ViewResolver;
export { Domains, ViewStructures, ViewVariations, ViewEntityRelation };
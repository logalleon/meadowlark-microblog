import { Request, Response } from 'express';
import { snakeCase } from 'lodash';
import { Connectable } from '../../Interfaces';
import ViewResolver, { ViewVariations, ViewStructures, Domains, ViewEntityRelation } from '../ViewResolver/ViewResolver';
import EntityType from '../Entity/EntityType';

class FieldController implements Connectable {

  public connection: any;

  constructor (connection: any) {
    this.connection = connection;
  }

  renderManageFields (req: Request, res: Response) {
    const { target } = req.params;
    const machineName = snakeCase(target);
    const title = 'Hello';
    const resolver: ViewResolver = req.app.locals.viewResolver;
    res.render(resolver.resolvePath({
      domain: Domains.ADMIN,
      target: EntityType.tableName,
      variation: ViewVariations.EDIT,
      structure: ViewStructures.FORM,
      relation: ViewEntityRelation.FIELD
    }), { machineName, title })
  }

}

export default FieldController;
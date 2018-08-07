import { Request, Response } from 'express';
import { join } from 'path';
import { snakeCase } from 'lodash';
import EntityType, { EntityTypeModel, RenderableEntityType } from './EntityType';
import { server } from '../../../config';
import ViewResolver, { Domains, ViewStructures, ViewVariations } from '../ViewResolver/ViewResolver';
import Field from '../Field/Field';

const { root: serverRoot } = server;

class EntityTypeController {

  public connection: any;

  constructor (connection: any) {
    this.connection = connection;
  }

  async create (req: Request, res: Response): Promise<any> {
    let { label, machineName } = req.body;
    machineName = snakeCase(machineName);
    // @TODO validations
    const entityType = new EntityType(null, { label, machineName });
    // @TODO check for duplicates
    try {
      const status = await entityType.create(this.connection);
      res.sendStatus(200);
    } catch (e) {
      res.json(e);
    }
  }

  async findAll (req: Request, res: Response): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const { machineName } = req.body;
      try {
        const entityTypes: any = await EntityType.findAllOfType(req.app.locals.connection, machineName);
        res.json(entityTypes);
      } catch (e) {
        res.sendStatus(500);
      }
    });
  }

  async renderEntityTypes (req: Request, res: Response) {
    const resolver: ViewResolver = req.app.locals.viewResolver;
    const entityTypes: EntityTypeModel[] = await EntityType.findAll(req.app.locals.connection);
    const renderList: RenderableEntityType[] = entityTypes.map((entityType) => {
      const renderable: any = entityType;
      renderable.editEntityLink = resolver.resolveUrlPath({
        domain: Domains.ADMIN,
        structure: ViewStructures.FORM,
        variation: ViewVariations.EDIT,
        target: entityType.machineName
      });
      renderable.manageFieldsLink = resolver.resolveUrlPath({
        domain: Domains.ADMIN,
        structure: ViewStructures.FORM,
        variation: ViewVariations.EDIT,
        target: `${entityType.machine_name}/${Field.tableName}`
      });
      return <RenderableEntityType>renderable;
    });
    const createLink = resolver.resolveUrlPath({
      domain: Domains.ADMIN,
      structure: ViewStructures.FORM,
      variation: ViewVariations.CREATE,
      target: EntityType.tableName
    });
    res.render(resolver.resolvePath({
        domain: Domains.ADMIN,
        structure: ViewStructures.VIEW,
        target: EntityType.tableName
      }), {
      title: 'Entity Types Here',
      entityTypes: renderList,
      createLink
    });
  }

  renderEntityTypeForm (req: Request, res: Response) {
    const resolver: ViewResolver = req.app.locals.viewResolver;
    const viewLink  = resolver.resolveUrlPath({
      domain: Domains.ADMIN,
      structure: ViewStructures.VIEW,
      target: EntityType.tableName
    });
    const submitAction = resolver.resolveUrlPath({
      domain: Domains.ADMIN,
      structure: ViewStructures.VIEW,
      target: EntityType.tableName
    });
    res.render(resolver.resolvePath({
        domain: Domains.ADMIN,
        structure: ViewStructures.FORM,
        variation: ViewVariations.CREATE,
        target: EntityType.tableName
      }), {
      title: 'Create Entity Type',
      viewLink,
      submitAction
    });
  }

}

export default EntityTypeController;
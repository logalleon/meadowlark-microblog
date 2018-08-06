import { Request, Response } from 'express';
import { join } from 'path';
import EntityType, { EntityTypeModel } from './EntityType';
import { server } from '../../../config';

const { root: serverRoot } = server;

class EntityTypeController {

  public connection: any;

  constructor (connection: any) {
    this.connection = connection;
  }

  async create (req: Request, res: Response): Promise<any> {
    const { label, machineName } = req.body;
    // @TODO validations
    const entityType = new EntityType(null, { label, machineName });
    // @TODO check for duplicates
    try {
      const status = await entityType.create(this.connection);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
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
    const entityTypes: EntityTypeModel[] = await EntityType.findAll(req.app.locals.connection);
    res.render(`./admin/admin__view__${EntityType.tableName}`, {
      title: 'Entity Types',
      entityTypes
    });
  }

}

export default EntityTypeController;
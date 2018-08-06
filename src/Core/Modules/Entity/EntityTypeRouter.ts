import { Router } from 'express';
import EntityTypeController from './EntityTypeController';
import { Sequelize } from 'sequelize';
import EntityType from './EntityType';

const router = Router();

export default (connection: Sequelize) => {

  EntityType.defineTables(connection);

  const controller: EntityTypeController = new EntityTypeController(connection);
  router.get('/admin/entity-types', controller.renderEntityTypes.bind(controller));
  return router;
};
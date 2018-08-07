import { Router } from 'express';
import EntityTypeController from './EntityTypeController';
import { Sequelize } from 'sequelize';
import EntityType from './EntityType';
import ViewResolver, { Domains, ViewStructures, ViewVariations } from '../ViewResolver/ViewResolver';

const router = Router();
const viewResolver: ViewResolver = new ViewResolver();

export default async (connection: Sequelize) => {

  const result = await EntityType.defineTables(connection);

  const controller: EntityTypeController = new EntityTypeController(connection);

  router.get(viewResolver.resolveUrlPath({
    domain: Domains.ADMIN,
    structure: ViewStructures.VIEW,
    target: EntityType.tableName
  }), controller.renderEntityTypes.bind(controller));
  router.get(viewResolver.resolveUrlPath({
    domain: Domains.ADMIN,
    structure: ViewStructures.FORM,
    variation: ViewVariations.CREATE,
    target: EntityType.tableName
  }), controller.renderEntityTypeForm.bind(controller));

  router.post(viewResolver.resolveUrlPath({
    domain: Domains.ADMIN,
    structure: ViewStructures.VIEW,
    target: EntityType.tableName
  }), controller.create.bind(controller));
  return router;
};
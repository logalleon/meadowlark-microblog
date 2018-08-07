import { Router } from 'express';
import FieldController from './FieldController';
import { Sequelize } from 'sequelize';
import EntityType from './Field';
import ViewResolver, { Domains, ViewStructures, ViewVariations, ViewEntityRelation } from '../ViewResolver/ViewResolver';
import Field from './Field';

const router = Router();
const viewResolver: ViewResolver = new ViewResolver();

export default async (connection: Sequelize) => {

  //const result = await Field.defineTables(connection);

  const controller: FieldController = new FieldController(connection);
  console.log(viewResolver.resolveParameterUrlPath({
    domain: Domains.ADMIN,
    relation: true,variation: ViewVariations.EDIT
  }));
  router.get(viewResolver.resolveParameterUrlPath({
    domain: Domains.ADMIN,
    relation: true,
    variation: ViewVariations.EDIT
  }), controller.renderManageFields.bind(controller));

  return router;
};
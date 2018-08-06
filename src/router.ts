import { Router } from 'express';

import EntityTypeRouter from './Core/Modules/Entity/EntityTypeRouter';
import { RequestHandlerParams } from 'express-serve-static-core';

const router = Router();

export default (connection: any): RequestHandlerParams => {
  /**
   * Routes
   */
  // const Admin = require('./Admin/router');
  // const Post = require('./Post/router');

  // router.use(Admin);
  // router.use(Post);
  router.use(EntityTypeRouter(connection));
  return router;
};

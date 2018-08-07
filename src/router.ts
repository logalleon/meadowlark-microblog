import { Router } from 'express';

import EntityTypeRouter from './Core/Modules/Entity/EntityTypeRouter';
import FieldRouter from './Core/Modules/Field/FieldRouter';
import { RequestHandlerParams } from 'express-serve-static-core';

const router = Router();

export default async (connection: any): Promise<RequestHandlerParams> => {
  return new Promise<RequestHandlerParams>(async (resolve, reject) => {
    /**
     * Routes
     */
    // const Admin = require('./Admin/router');
    // const Post = require('./Post/router');

    // router.use(Admin);
    // router.use(Post);
    router.use(await EntityTypeRouter(connection));
    router.use(await FieldRouter(connection));
    resolve(router);
  });
};

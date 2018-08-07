import { Request, Response } from 'express';
import { Connectable } from '../../Interfaces';

class FieldController implements Connectable {

  public connection: any;

  constructor (connection: any) {
    this.connection = connection;
  }

  renderManageFields (req: Request, res: Response) {
    const { target } = req.params;
    res.json(target);
  }

}

export default FieldController;
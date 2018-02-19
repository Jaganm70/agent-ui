import User from '../../models/user.model';
import * as bcrypt from 'bcrypt';
import * as Joi from 'joi';
import { createJWT } from './jwt';

const schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const TOKEN_EXPIRY_MINS = 30;

export default async function (req, res) {
  const validation = Joi.validate(req.body, schema);
  if (validation.error) {
    res.status(400).json({
      error: validation.error.details[0].message,
    });
    return;
  }

  const user: any = await User.findOne({
    username: req.body.username
  }).lean();

  if (!user) {
    res.status(401).json({
      error: 'Username or password incorrect.',
    });
    return;
  }

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) {
    res.status(401).json({
      error: 'Username or password incorrect.',
    });
    return;
  }

  // Successful login
  const token = createJWT({
    username: user.username,
    user_id: user._id,
  }, `${TOKEN_EXPIRY_MINS}m`);

  res
    .status(204)
    .cookie('jwt_token', token, { maxAge: TOKEN_EXPIRY_MINS * 60 * 1000, httpOnly: true })
    .end();

}

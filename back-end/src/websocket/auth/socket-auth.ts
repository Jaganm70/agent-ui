import { verifyJWT } from '../../api/auth/jwt';
import * as cookie from 'cookie';
import { log } from 'winston';
import User from '../../models/user.model';
import * as config from 'config';
export { logInAuth };

const TEST_SECRET = config.get('TEST_SOCKET_SECRET');

export interface SocketCustom extends SocketIO.Socket {
  claim: {
    user_id: string;
    username: string;
  };
}

function logInAuth(io) {
  return async (socket, next) => {
    
    const cookieString = socket.handshake.headers.cookie;
    const cookies = cookie.parse(cookieString || '');

    if (!cookies.jwt_token) {
      log('info', 'No token provided');
      return next(new Error('No token provided'));
    }
    try {
      socket.claim = await verifyJWT(cookies.jwt_token);
      //const user: any = await User.findById(socket.claim.user_id);

      /*if (!user) {
        return next(new Error('User not found'));
      }*/
      
      return next();
    } catch (e) {
      log('info', 'Socket Auth', e);
      return next(new Error('Invalid token'));
    }
  };
}

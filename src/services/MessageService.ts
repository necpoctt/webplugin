import baseAPI from '../app/axios';

export default class Message {
  static async initToken(authData: any) {
    const response = await baseAPI.post('/user/signin', authData);
    return response;
  }

  static async getTwilioToken() {
    const response = await baseAPI.get('/chat/token');
    return response;
  }

  static async getMessages() {
    const response = await baseAPI.get('/message');
    return response;
  }
}

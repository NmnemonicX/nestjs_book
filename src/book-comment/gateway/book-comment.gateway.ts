import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class BookCommentGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any): any {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): string {
    return 'Работает!';
  }
}

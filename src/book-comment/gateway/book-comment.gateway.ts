import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { BookCommentService } from '../book-comment.service';

@WebSocketGateway()
export class BookCommentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private bookCommentService: BookCommentService) {}

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('FindAllBookCommentToServer')
  async handlegetAllComment(client: Socket, book: { bookId: string }) {

      const messages = await this.bookCommentService.findAllBookComment(book.bookId);
    return { event: 'FindAllBookCommentToClient', data: messages };
  }

  @SubscribeMessage('BookCommentToServer')
  async handleMessage2(
    client: Socket,
    message: { sender: string; book: string; message: string },
  ) {
    await this.bookCommentService.create({
      user: message.sender,
      bookId: message.book,
      comment: message.message,
    });
    return { event: 'BookCommentToClient', data: message };
  }


  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // return 'Работает!';

    return { event: 'msgToClient', data: text + 234 };
  }
}

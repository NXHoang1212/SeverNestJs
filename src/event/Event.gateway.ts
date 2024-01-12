import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4000, { namespace: 'product' })
export class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected to product namespace: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected from product namespace: ${client.id}`);
  }

  sendProductUpdate(products: any) {
    this.server.emit('getProducts', products);
  }
}

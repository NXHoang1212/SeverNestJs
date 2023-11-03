import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';


//đây là một websocket gateway để xử lý realtime event cho client có đường dẫn là /event localhost:4000/event
@WebSocketGateway(4000, { namespace: 'event' })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    //khi có client kết nối đến thì sẽ gửi về cho client một message là "hello from server"
    handleConnection(client: any, ...args: any[]) {
        client.emit('connection', 'Xin chào hoàng nguyễn');
        console.log('client connected');
    }

    //khi client disconnect thì sẽ gửi về cho client một message là "disconnected"
    handleDisconnect(client: any) {
        client.emit('disconnected');
        console.log('client disconnected');
    }

}

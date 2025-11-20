import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Announcement } from 'src/announcements/announcement.model';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
  namespace: '/announcements',
})
export class AnnouncementsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Client connected');
  }

  emitAnnouncementCreated(payload: Announcement) {
    this.server.emit('announcementCreated', payload);
  }
}

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3005', {
      reconnection: true
    });
    console.log("Connected to WebSocket via Socket.IO");
  }

  onTaskUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('task-updated', (data) => {
        observer.next(data);
      });
    });
  }

  sendMessage(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}
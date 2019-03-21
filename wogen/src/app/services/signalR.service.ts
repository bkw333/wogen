import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { map } from 'rxjs/operators';

@Injectable()
export class SignalRService {
    private hubConnection: HubConnection;
    postReceived = new Subject<any>();
    connectionEstablished = new Subject<boolean>();

    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/exercisesHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
    }

    private startConnection(): any {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
                this.connectionEstablished.next(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(this.startConnection(), 5000);
            });
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('OnCreated', (data: any) => {
            data.status = 'created';
            data.ResponseText = `${data.name} created`;
            this.postReceived.next(data);
        });

        this.hubConnection.on('OnUpdated', (data: any) => {
            data.status = 'updated';
            data.ResponseText = `${data.Name} updated`;
            this.postReceived.next(data);
        });

        this.hubConnection.on('OnDeleted', (data: any) => {
            data.status = 'deleted';
            data.ResponseText = 'Entry deleted';
            this.postReceived.next(data);
        });

        this.hubConnection.on('OnNotFound', (data: any) => {
            data.status = 'notFound';
            data.ResponseText = `Entry not found`;
            this.postReceived.next(data);
        });
    }
}

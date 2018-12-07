import { Component, OnInit } from '@angular/core';

import { Client } from '../../models/Client'
import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[]
  totalOwed: number

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this._clientService.getClients().subscribe(clients => {
      this.clients = clients
      this.getTotalOwed()
    })
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total: number, client) => {
      return  total + Number(client.balance)
    }, 0)
  }
}

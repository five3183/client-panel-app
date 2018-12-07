import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ClientService } from '../../services/client.service'
import { Client } from '../../models/Client'

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string
  client: Client
  hasBalance: boolean = false
  showBalanceUpdateInput: boolean = false

  constructor(
    private _clientService: ClientService, 
    private _router: Router, 
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //GET ID FROM URL
    this.id = this._route.snapshot.params['id']
    //GET CLIENT
    this._clientService.getClient(this.id).subscribe(client => {
      if(client != null) {
        if(client.balance > 0 ) {
          this.hasBalance = true
        }
      }
      this.client = client
    })
  }

  updateBalance() {
    this._clientService.updateClient(this.client)
    this._flashMessage.show('Balance updated!', {cssClass: 'alert-success', timeout: 4000})
  }
  onClickDelete() {
    console.log('click')
    if(confirm('Do you want to delete this client?')) {
      this._clientService.deleteClient(this.client)
      this._flashMessage.show('Client removed!', {cssClass:'alert-success', timeout: 4000})
    }
    this._router.navigate(['/'])
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ClientService } from '../../services/client.service'
import { Client } from '../../models/Client'
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string
  client: Client = {
    firstName: '',
    lastName:'', 
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean

  constructor(
    private _clientService: ClientService, 
    private _router: Router, 
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService,
    private _settingsService: SettingsService
  ) { }

  ngOnInit() {
    //GET ID FROM URL
    this.id = this._route.snapshot.params['id']
    //GET CLIENT
    this._clientService.getClient(this.id).subscribe(client => this.client = client)
    this.disableBalanceOnEdit = this._settingsService.getSettings().disableBalanceOnEdit
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this._flashMessage.show('All fields are required!', {cssClass: 'alert-danger', timeout: 4000})
    } else {
      // add id to client
      value.id = this.id
      this._clientService.updateClient(value)
      this._flashMessage.show('Client Updated!', {cssClass: 'alert-success', timeout: 4000})
      this._router.navigate([`/client/${this.id}`])
    }
  }
}

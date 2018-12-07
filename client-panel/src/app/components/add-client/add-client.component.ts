import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service'
import { Router } from '@angular/router'

import { Client } from '../../models/Client'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean = true
  @ViewChild('clientForm') form: any
  constructor(
    private _flashMessage: FlashMessagesService,
    private _clientService: ClientService,
    private _router: Router
    
  ) { }

  ngOnInit() {
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if(!valid) {
      this._flashMessage.show('Please fill out all required fields!', {cssClass: 'alert-danger', timeout: 4000})
    }
    else {
      // ADD NEW CLIENT
      // SHOW MESSAGE
      // REDIRECT TO DASH
      this._clientService.newClient(value)

      this._flashMessage.show('A new client was added!', {cssClass: 'alert-success', timeout: 4000})
      this._router.navigate(['/'])
    }
  }
}

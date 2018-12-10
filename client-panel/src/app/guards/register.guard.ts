import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from "rxjs/operators"

import { SettingsService } from '../services/settings.service'

@Injectable({providedIn: 'root'})
export class RegisterGuard implements CanActivate {
   constructor(
      private _router: Router,
      private _afAuth: AngularFireAuth,
      private _settingService: SettingsService
   ) { }

   canActivate(): boolean {
      if(this._settingService.getSettings().allowRegistration) {
         return true
      } else {
         this._router.navigate(['/login'])
      }
   }
}
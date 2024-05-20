import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-contact',
  templateUrl: './checkout-contact.component.html',
  styleUrls: ['./checkout-contact.component.scss']
})
export class CheckoutContactComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(public accountService: AccountService){}

  getContactDataValuesByClick(){
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => {
      if(user){
        this.checkoutForm?.patchValue({
          contactForm: {
            contactName: user.fullName,
            contactEmail: user.email,
            contactPhone: user.phoneNumber
          }
        })
      }
    })
  }
}

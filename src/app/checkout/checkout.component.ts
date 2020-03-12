import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { OrderRequest } from '../models/orderRequest';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public sessionId: string;
  public orderRequest: OrderRequest[] = []; // declare the request array
  constructor(private service: CheckoutService) { }

  ngOnInit() {
    // when the component loads, I am initializing the orderRequest with fixed values.
    this.orderRequest.push({
      InventoryItemId: 1,
      Quantity: 3
    }, {
      InventoryItemId: 2,
      Quantity: 1
    }, {
      InventoryItemId: 3,
      Quantity: 2
    });
  }

  submit() {
    // using the fixed values above, we will pass that array to the service.
    // with .subscribe, we are using the session id provided by the api to redirect to the appropriate session within Stripe.
    this.service.paymentRequest(this.orderRequest).subscribe(resp => this.redirect(resp.id));
  }

  // below taken directly from Stripe Documentation (except the window.alert)
  redirect(id: string) {
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: id
    }).then(function (result: { error: { message: any; }; }) {
      window.alert(result.error.message);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });
  }

}

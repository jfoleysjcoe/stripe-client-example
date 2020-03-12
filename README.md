# MyShopApp

### Reference

[Stripe Api - One-Time Checkout](https://stripe.com/docs/payments/checkout/one-time)

# Using Stripe

To start with Strpe, you will have to create an account at Stripe.com.

Once created, you will need to set up a few files to get to the good stuff.

##### environments/environment.ts
```typescript
export const environment = {
  production: false,
  stripeKey: 'pk_test_...', // go to link below this code block to find your Publishable key
  api: 'http://localhost:5000' // your api's base url
};
```
[Api Keys Link](https://dashboard.stripe.com/test/apikeys)

##### index.html
```html
<script src="https://js.stripe.com/v3/"></script>
<script type="text/javascript">
  var stripe;
</script>
```

##### app/typings.d.ts
```javascript
declare var stripe: any;
declare function Stripe(key: string);
```

##### app/app.component.ts
```typescript
constructor() {
  stripe = Stripe(environment.stripeKey);
}
```
### Models and Services

Once the Stripe object is set up. You can create your Client model. In this project, the client will provide hard values to the API. Normally, you would want to create the objects from the selection the user has made.

The client will only need to send the API the Id of each item and the quantity with each Id.

#### Request Model
##### app/models/orderRequest.ts
```typescript
export class OrderRequest {
  public InventoryItemId: number;
  public Quantity: number;
}
```

#### Checkout Component

##### app/checkout/checkout.component.ts
```typescript
public orderRequest: OrderRequest[] = []; // declare the request array

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
  this.service.paymentRequest(this.orderRequest)
    .subscribe(resp => this.redirect(resp.id));
}

// below taken directly from Stripe Documentation (except the window.alert)
redirect(id: string) {
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: id
    }).then(function (result: any) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      window.alert(result.error.message);
    });
  }
```

#### Checkout Service

##### checkout.service.ts
```typescript
paymentRequest(request: OrderRequest[]) {
  return this.http.post<any>(`${this.api}/purchaseorder/payment`, request);
}
```

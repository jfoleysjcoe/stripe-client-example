import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  purchaseOrderResponse = {};
  constructor(_service: ApiService, activatedRoute: ActivatedRoute) {
    const s = activatedRoute.snapshot.queryParams['session_id'];
    _service.getPaymentResult(s).subscribe(resp => {
      this.purchaseOrderResponse = resp;
    });
  }

  ngOnInit() {
  }
}

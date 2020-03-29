import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-successful-order-dialog',
  templateUrl: './successful-order-dialog.component.html',
  styleUrls: ['./successful-order-dialog.component.css']
})
export class SuccessfulOrderDialogComponent implements OnInit {

constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-dialog",
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <!-- <p>Loading...</p> -->
      <mat-spinner [diameter]="20" color="primary"></mat-spinner>
    </div>
  `,
  styles: [``]
})
export class LoadingDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

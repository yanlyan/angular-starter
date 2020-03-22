import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-loading-dialog",
  template: `
    <h1 mat-dialog-title>Konfirmasi</h1>
    <div mat-dialog-content>
      <p>Apakah anda yakin?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-flat-button color="warn" (click)="dialogRef.close(false)">
        Tidak
      </button>
      <button
        mat-flat-button
        color="primary"
        cdkFocusInitial
        (click)="dialogRef.close(true)"
      >
        Ya
      </button>
    </div>
  `,
  styles: [``]
})
export class ConfirmDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  ngOnInit(): void {}
}

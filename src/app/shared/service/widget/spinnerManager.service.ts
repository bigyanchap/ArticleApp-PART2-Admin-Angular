import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerManagerService {

  constructor(private spinner: NgxSpinnerService) { }
  title: string = "Loading ...";
  hideSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showSpinner(title: string) {
    this.title = title;
    setTimeout(() => {
      this.spinner.show();
    }, 0);
  }
  showHideSpinnerForSave() {
    this.showSpinner("Saving...");
    this.hideSpinner();
  }
  showHideSpinnerToLoad() {
    this.showSpinner("Loading...");
    this.hideSpinner();
  }

}
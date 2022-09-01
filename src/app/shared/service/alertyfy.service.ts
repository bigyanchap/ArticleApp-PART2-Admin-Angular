import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AlertyfyService {

  constructor() { }

  alert(message) {
    alertify.alert(message);
  }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
      else { }
    }).set({ transition: 'zoom' }).show().setHeader('  ');
  }

  confirmDeletion(objectName: string, okCallback: () => any) {
    alertify.confirm(`Are you sure you want to delete ${objectName} ?`, (e: any) => {
      if (e) {
        okCallback();
      }
      else { }
    }).set({ transition: 'zoom' }).show().setHeader('  ');
  }

  confirmRemove(str: string, okCallback: () => any) {
    alertify.confirm(`Are you sure you want to remove ${str} ?`, (e: any) => {
      if (e) {
        okCallback();
      }
      else { }
    }).set({ transition: 'zoom' }).show().setHeader('  ');
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }
  saveError(componentName: string) {
    alertify.error("Something went wrong while adding " + componentName + ".");
  }
  deletionError(componentName: string) {
    alertify.error("Something went wrong while deleting " + componentName + ".");
  }
  getError(componentName: string) {
    alertify.error("Something went wrong while getting " + componentName + ".");
  }
  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.warning(message);
  }

}

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatingEnum } from 'src/app/shared/enums/DatingEnum';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datefilter',
  templateUrl: './datefilter.component.html',
  styleUrls: ['./datefilter.component.scss']
})
export class DatefilterComponent implements OnInit {

  @Output() myoutput: EventEmitter<any> = new EventEmitter();
  outputDate: any;
  showStartDate = false;
  dateFilterType = 0;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  showEndDate = false;

  queryObject = {
    startDate: new Date(0),
    endDate: new Date(0),
    selectedOption: 0
  };

  DatingDict = [
    { key: 'Tomorrow', value: DatingEnum.tomorrow },
    { key: 'Today', value: DatingEnum.today },
    { key: 'Yesterday', value: DatingEnum.yesterday },
    { key: 'On or After', value: DatingEnum.onOrAfter },
    { key: 'On', value: DatingEnum.on },
    { key: 'On or Before', value: DatingEnum.OnOrBefore },
    { key: 'Between', value: DatingEnum.between },
    { key: 'Next Week', value: DatingEnum.nextWeek },
    { key: 'This Week', value: DatingEnum.thisWeek },
    { key: 'Last Week', value: DatingEnum.lastWeek },
    { key: 'Next Month', value: DatingEnum.nextMonth },
    { key: 'This Month', value: DatingEnum.thisMonth },
    { key: 'Last Month', value: DatingEnum.lastMonth },
    { key: 'Next Year', value: DatingEnum.nextYear },
    { key: 'This Year', value: DatingEnum.thisYear },
    { key: 'Last Year', value: DatingEnum.lastYear },
  ];

  constructor() { }
  ngOnInit(): void { }

  onDatingSelect(event) {
    this.queryObject.selectedOption = this.dateFilterType;
    if (Number(this.dateFilterType) == DatingEnum.between) {
      this.showStartDate = true;
      this.showEndDate = true;
    }
    else if (Number(this.dateFilterType) == DatingEnum.onOrAfter || Number(this.dateFilterType) == DatingEnum.on) {
      this.showStartDate = true;
      this.showEndDate = false;
    } else if (Number(this.dateFilterType) == DatingEnum.OnOrBefore) {
      this.showStartDate = false;
      this.showEndDate = true;
    }
    else {
      this.showStartDate = false;
      this.showEndDate = false;
    }
    this.myoutput.emit(this.queryObject);
  }

  public sendData($event) {
    if (this.showStartDate && this.startDate) {
      this.queryObject.startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day, 0, 0, 0) || new Date(0);
    }
    if (this.showEndDate && this.endDate) {
      this.queryObject.endDate = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day, 0, 0, 0) || new Date(0);
    }
    this.myoutput.emit(this.queryObject);
  }

  public reset() {
    this.dateFilterType = 0;
    this.showStartDate = false;
    this.showEndDate = false;
  }

}

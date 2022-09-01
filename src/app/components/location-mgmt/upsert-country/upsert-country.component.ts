import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerManagerService } from 'src/app/shared/service/widget/spinnerManager.service';
import {TextInputComponent} from 'src/app/shared/components/text-input/text-input.component';
import { CountryService } from 'src/app/shared/service/location/country.service';
import { Country } from 'src/app/shared/models/location';
@Component({
  selector: 'app-upsert-country',
  templateUrl: './upsert-country.component.html',
  styleUrls: ['./upsert-country.component.scss']
})
export class UpsertCountryComponent implements OnInit {
  countryListForm: FormGroup;
  countryList = [];
  dropdownSettings = {};
  countryid: number = 0;
  btnSave = 'Save';
  title ='Create';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private spinningManager: SpinnerManagerService
  ) {
    this.countryListForm = this.fb.group({
      id: '',
      name: '',
      code: ''
    });

    this.countryid = this.route.snapshot.params.id === undefined ? 0 : parseInt(this.route.snapshot.params.id);
    this.spinningManager.showSpinner("Loading...");
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      enableCheckAll: false,
    };
    this.countryService.getCountryById(this.countryid).subscribe((result) => {
      this.countryListForm = this.fb.group({
        name: result["name"],
        code: result["code"],
      });
    });
    if(Number(this.countryid) >0)
    {
      this.btnSave = 'Update';
      this.title = 'Update';
    }
    this.spinningManager.hideSpinner();

  }

  saveCountryList() {
    this.spinningManager.showSpinner("Saving...");
    if (this.countryid && this.countryid > 0) {
      const _country = {
        id: this.countryid, 
        name: this.countryListForm.controls.name.value,
        code: this.countryListForm.controls.code.value
      };
      this.countryService.upsertCountry(_country).subscribe(result => {
        this.router.navigateByUrl('/location-mgmt/list-country');
        this.spinningManager.hideSpinner();
      }, error => {
        this.spinningManager.hideSpinner();
      })
    }
    else {
      var _country = new Country();
      var country = this.countryListForm.value;
      _country.id = Number(country.id) || 0;
      _country.name = country.name;
      _country.code = country.code;

      this.countryService.upsertCountry(_country)
        .subscribe(res => {
          if (res) {
            this.countryListForm.reset();
            this.router.navigateByUrl('/location-mgmt/list-country');
            this.spinningManager.hideSpinner();
          }
        });
    }
    error => {
      console.log("Something went wrong.");
      this.spinningManager.hideSpinner();
      this.router.navigateByUrl('/location-mgmt/list-country');
    }
  }
}


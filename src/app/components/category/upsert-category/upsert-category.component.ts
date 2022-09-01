import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { environmentconstants } from 'src/environments/environment';

@Component({
  selector: 'app-upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.css']
})
export class UpsertCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  baseUrlForImage=environmentconstants.baseUrlForFile;
  imagePath="";
  imageNameTemp="";
  selectedItems = [];
  files: File[] = [];
  limitSelection = false;
  categoryId=0;
  btnSave = 'Save';
  title ='Create';
  public formData = new FormData();

  constructor(
    private alertyfy: AlertyfyService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.categoryId = this.activatedRoute.snapshot.params.id === undefined ? 0 : parseInt(this.activatedRoute.snapshot.params.id);
  }

  ngOnInit() {
    if(this.categoryId==0){
      this.createCategoryForm();
    }else{
      this.editCategoryForm();
    }
  }

  onSelect(event) {
    this.files=[];
    this.imagePath="";
    this.formData = new FormData();
    this.files.push(...event.addedFiles);
    for (let i = 0; i < this.files.length; i++)
    {
      this.formData.append('files[]', this.files[i]);
    }
    this.imageNameTemp=this.files[0].name;
  }

  editCategoryForm() {
    this.createCategoryForm();
    this.categoryService.getCategoryById(this.categoryId)
    .subscribe(res=>{
      console.log(res);
      this.categoryForm.patchValue(res);
      this.imagePath=res.imagePath;
      this.btnSave = 'Update';
      this.title = 'Update';
    });
  }

  createCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, this.noWhitespace]],
      description: ['', [Validators.required, this.noWhitespace]],
      statusId:[''],
      password: ['', [Validators.required, this.noWhitespace]]
    });
  }

  onSubmit() {
    const cat = this.categoryForm.value;
    this.formData.append("name",cat.name);
    this.formData.append("description",cat.description);
    this.formData.append("statusId",cat.statusId);
    this.formData.append("password",cat.password);
    if(this.categoryId==0){
      this.categoryService.addCategory(this.formData).subscribe(categoryId => {
        this._router.navigateByUrl('category/list-category');
        this.alertyfy.success('Saved.');
      }, err => {
        this.alertyfy.error(err);
      });
    }
    else
    {
      this.formData.append("id",this.categoryId.toString());
      this.categoryService.editCategory(this.formData)
        .subscribe(categoryId => {
          this._router.navigateByUrl('category/list-category');
          this.alertyfy.success('Saved.');
      }, err => {
        this.alertyfy.error(err);
      });
    }
  }
  

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

}


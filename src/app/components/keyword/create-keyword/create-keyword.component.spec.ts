/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateKeywordComponent } from './create-keyword.component';

describe('CreateKeywordComponent', () => {
  let component: CreateKeywordComponent;
  let fixture: ComponentFixture<CreateKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKeywordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReferenceComponent } from './article-reference.component';

describe('ArticleReferenceComponent', () => {
  let component: ArticleReferenceComponent;
  let fixture: ComponentFixture<ArticleReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

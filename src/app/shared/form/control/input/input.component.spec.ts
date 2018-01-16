import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputType } from '../input-type';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    component.config =     {
      component: InputComponent,
      placeholderText: 'Name',
      property: 'displayName',
      type: InputType.TEXT,
    };
    component.group = new FormGroup({ displayName: new FormControl() });

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

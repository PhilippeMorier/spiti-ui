import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Control, ControlConfig } from './control/control';
import { FormControlHostDirective } from './form-control-host.directive';
import { FormComponent } from './form.component';

@Component({
  selector: 'spt-dummy-component',
  template: `<div>Dummy component!</div>`,
})
export class DummyComponent implements Control {
  public group: FormGroup;
  public config: ControlConfig;
}

// https://stackoverflow.com/a/41484578/3731530
// https://github.com/angular/angular/issues/10760
@NgModule({
  declarations: [ DummyComponent ],
  entryComponents: [ DummyComponent ],
})
class TestModule {
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let config: ControlConfig;
  let group: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ FormComponent, FormControlHostDirective ],
        imports: [
          ReactiveFormsModule,
          FormsModule,
          TestModule,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    group = new FormGroup({});
    component.model = {
      displayName: 'Philippe',
      email: 'philippe@test.com',
      formGroup: group,
      uid: '4242',
    };
    config = {
      component: DummyComponent,
      placeholderText: 'Name',
      property: 'displayName',
      type: 'text',
    };
    component.configs = [ config ];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render dummy component', () => {
    const divElement = fixture.debugElement
      .query(By.css('spt-dummy-component div'));
    expect(divElement.nativeElement.innerText).toEqual('Dummy component!');
  });

  it('should pass config to dummy component', () => {
    const dummyElement = fixture.debugElement
      .query(By.css('spt-dummy-component'));
    const dummyComponent: DummyComponent = dummyElement.componentInstance;

    expect(dummyComponent.config).toEqual(config);
  });

  it('should pass group to dummy component', () => {
    const dummyElement = fixture.debugElement
      .query(By.css('spt-dummy-component'));
    const dummyComponent: DummyComponent = dummyElement.componentInstance;

    expect(dummyComponent.group).toEqual(group);
  });
});

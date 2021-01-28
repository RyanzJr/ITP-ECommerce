import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TapesPage } from './tapes.page';

describe('TapesPage', () => {
  let component: TapesPage;
  let fixture: ComponentFixture<TapesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TapesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

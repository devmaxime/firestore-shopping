import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryAddPage } from './inventory-add.page';

describe('InventoryAddPage', () => {
  let component: InventoryAddPage;
  let fixture: ComponentFixture<InventoryAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

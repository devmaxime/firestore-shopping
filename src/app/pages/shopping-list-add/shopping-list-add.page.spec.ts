import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShoppingListAddPage } from './shopping-list-add.page';

describe('ShoppingListAddPage', () => {
  let component: ShoppingListAddPage;
  let fixture: ComponentFixture<ShoppingListAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

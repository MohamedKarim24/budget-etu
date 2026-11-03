import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepenseDetail } from './depense-detail';

describe('DepenseDetail', () => {
  let component: DepenseDetail;
  let fixture: ComponentFixture<DepenseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepenseDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DepenseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

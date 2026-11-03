import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepensesCard } from './depenses-card';

describe('DepensesCard', () => {
  let component: DepensesCard;
  let fixture: ComponentFixture<DepensesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepensesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DepensesCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

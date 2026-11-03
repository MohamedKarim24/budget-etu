import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepenseAjout } from './depense-ajout';

describe('DepenseAjout', () => {
  let component: DepenseAjout;
  let fixture: ComponentFixture<DepenseAjout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepenseAjout],
    }).compileComponents();

    fixture = TestBed.createComponent(DepenseAjout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

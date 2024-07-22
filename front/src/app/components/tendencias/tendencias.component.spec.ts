import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenciasComponent } from './tendencias.component';

describe('TendenciasComponent', () => {
  let component: TendenciasComponent;
  let fixture: ComponentFixture<TendenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

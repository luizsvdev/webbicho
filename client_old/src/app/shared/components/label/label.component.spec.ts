import {
	ComponentFixture,
	TestBed
} from '@angular/core/testing';

import {LabelComponent} from './label.component';

describe('LabelComponent', () => {
	let component: LabelComponent;
	let fixture: ComponentFixture<LabelComponent>;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LabelComponent]
		});
		fixture = TestBed.createComponent(LabelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

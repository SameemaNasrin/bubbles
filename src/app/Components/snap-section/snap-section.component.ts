import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-snap-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snap-section.component.html',
  styleUrl: './snap-section.component.css'
})
export class SnapSectionComponent {
  sections = [1, 2, 3, 4, 5]; // You can adjust the sections as needed
  navs = ["Who We Are?", "What We Do?", "Our Principles", "Why Choose Us?", "Case Studies", "Get In Touch"];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  activateSnapScroll(event: Event) {
    const container = this.el.nativeElement.querySelector('.scroll-container');
    const containerPosition = container.getBoundingClientRect();
    const scrollTop = containerPosition.top;

    console.log("SNAP SCROLL" + scrollTop)
    if (scrollTop === 0) {
      this.renderer.addClass(container, 'snap-active');
    } else {
      this.renderer.removeClass(container, 'snap-active');
    }
  }
}

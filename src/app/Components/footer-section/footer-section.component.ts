import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css'
})
export class FooterSectionComponent {
  designServies= ['Discovery', 'Mission, Vision & Values', 'Visual Identity', 'Brand Guideline', 'UX Audit', 'UI/UX Design', 'Prototyping', 'Design Systems', 'Web Design', 'Mobile Design'];
  developmentServices= ['HTML/CSS/JS', 'Angular', 'WordPress Development', 'Webflow Development'];
  constactInfo= ['bubbles © 2024. All rights reserved', 'abc@email.com', '+91-9999999999'];

  constructor(){
    gsap.registerPlugin(ScrollTrigger);
    this.initScrollTrigger();
  }
  initScrollTrigger(){
    // ScrollTrigger for snapping the video section into full view
    gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-container",   // The video section
        start: "top bottom",          // When the video reaches the top of the viewport
        pin: true,                 // Pin the video section (it stays fixed until scrolled past)
        scrub: true,               // Smooth scrolling behavior
        // markers: true,
        snap: {
          snapTo: 1,               // Snap to the full view of the video section
          duration: { min: 0.1, max: 1 },  // Duration of the snap
          ease: "power2.inOut"      // Ease function for smooth snapping
        },
        end: "+=80%",             // Snap to the next section after scrolling through the video
        pinSpacing: false          // Avoid extra space after the pin
      }
    });
  }
}

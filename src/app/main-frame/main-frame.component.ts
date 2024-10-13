import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SnapSectionComponent } from '../Components/snap-section/snap-section.component';
import { FooterSectionComponent } from '../Components/footer-section/footer-section.component';

@Component({
  selector: 'app-main-frame',
  standalone: true,
  imports: [SnapSectionComponent, FooterSectionComponent],
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css',
})
export class MainFrameComponent implements AfterViewInit {
  private mouseX = 0;
  private mouseY = 0;
  @ViewChild(SnapSectionComponent) snapSection: SnapSectionComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  scrollToContactForm() {
    if (this.snapSection) {
      this.snapSection.scrollToContactForm();  // Calling the child method
    } else {
      console.error('Snap section not found');
    }
  }

  updateMousePosition(event: MouseEvent): void {
    // console.log(event.clientX + "    " + event.clientY)
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.bubble(this.mouseX, this.mouseY);
  }

  ngAfterViewInit() {
    this.bubble(0, 600);
    this.scrollToExplore();
    this.initScrollTrigger();
  }

  initScrollTrigger() {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.video-frame', // The video section
        start: 'top 40%', // When the top of the video reaches 40% of the viewport
        end: 'top top', // When the top of the video reaches the top of the viewport
        scrub: true, // Smooth scroll behavior
        // markers: true,
        onEnter: () => {
          // Shrink the video when reaching 40%
          gsap.to('.video-frame', {
            scale: 0.9, // Shrink the video frame to 90%
            borderRadius: '40px',
            duration: 1,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          // Reset the video size when scrolling back up
          gsap.to('.video-frame', {
            scale: 1, // Restore the original size
            borderRadius: '0px',
            duration: 1,
            ease: 'power2.out',
          });
        },
      },
    });

    // ScrollTrigger for snapping the video section into full view
    gsap.timeline({
      scrollTrigger: {
        trigger: '.video-frame', // The video section
        start: 'bottom 80%', // When the video reaches the top of the viewport
        pin: true, // Pin the video section (it stays fixed until scrolled past)
        scrub: true, // Smooth scrolling behavior
        snap: {
          snapTo: 1, // Snap to the full view of the video section
          duration: { min: 0.1, max: 1 }, // Duration of the snap
          ease: 'power2.inOut', // Ease function for smooth snapping
        },
        end: '+=80%', // Snap to the next section after scrolling through the video
        pinSpacing: false, // Avoid extra space after the pin
      },
    });
  }

  bubble(x: any, y: any) {
    var bubbles = Math.floor(Math.random() * 10);
    console.log(bubbles);
    while (bubbles--) {
      var s = Math.floor(Math.random() * 100) + 50;
      const img = this.renderer.createElement('img');
      var className = 'bubble' + s;
      this.renderer.setAttribute(img, 'class', className);
      this.renderer.setAttribute(img, 'src', 'assets/Bubble.svg');
      this.renderer.setStyle(img, 'max-width', s + 'px');
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'top', '-50vh');
      this.renderer.setStyle(img, 'opacity', '0.3');
      this.renderer.setStyle(img, 'left', x + 'px');
      this.renderer.setStyle(img, 'z-index', 3000);
      this.renderer.listen(img, 'click', (event) => {
        this.popBubble(event.target);
      });
      const container = this.el.nativeElement.querySelector('.image-container');
      this.renderer.appendChild(container, img);
      gsap.from(`.${className}`, {
        duration: 8,
        y: y * 2,
        ease: 'expoScale(0.5,7,none)',
        // repeat:Infinity
      });
    }
  }

  scrollToExplore() {
    gsap.from('#scroll-to-explore', {
      y: -5,
      duration: 0.5,
      repeat: Infinity,
      ease: 'sine.inOut',
      yoyo: true,
    });
  }

  popBubble(bubble: HTMLElement) {
    console.log(bubble);

    // Animate the clicked bubble using GSAP
    gsap.to(bubble, {
      scale: 2, // Pop effect (scale up)
      duration: 0.2, // Animation duration
      ease: 'bounce.in', // Smooth easing effect
      onComplete: () => {
        // Set a red border to the clicked bubble after animation
        this.renderer.setStyle(bubble, 'display', 'none');
      },
    });
  }
}

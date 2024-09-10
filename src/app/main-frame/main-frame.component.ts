import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SnapSectionComponent } from '../Components/snap-section/snap-section.component';

@Component({
  selector: 'app-main-frame',
  standalone: true,
  imports: [HeaderComponent, SnapSectionComponent],
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css'
})
export class MainFrameComponent implements AfterViewInit {
  private mouseX = 0;
  private mouseY = 0;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  updateMousePosition(event: MouseEvent): void {
    // console.log(event.clientX + "    " + event.clientY)
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.bubble(this.mouseX, this.mouseY)
  }

  ngAfterViewInit() {
    this.bubble(0, 600);
    this.scrollToExplore();
    this.initScrollTrigger();
  }

  initScrollTrigger() {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".video-frame",   // Ensure this targets the video block
        start: "top 40%",          // Adjust start and end to control animation points
        end: "top 20%",
        scrub: true,
        //markers: true,            // For debugging
        onEnter: () => {
          gsap.to(".video-frame", {
            scale: 0.9,            // Shrinks the video when entering the scroll area
            duration: 1,
            borderRadius: '40px',
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(".video-frame", {
            scale: 1,              // Expands the video when leaving the scroll area
            borderRadius: '0px',
            duration: 1,
            ease: "power2.out"
          });
        }
      }
    });
  }


  bubble(x: any, y: any) {
    var bubbles = Math.floor(Math.random() * 10);
    console.log(bubbles)
    while (bubbles--) {
      var s = (Math.floor(Math.random() * 100)) + 50;
      const img = this.renderer.createElement('img');
      var className = 'bubble' + s;
      this.renderer.setAttribute(img, 'class', className)
      this.renderer.setAttribute(img, 'src', 'assets/Bubble.svg');
      this.renderer.setStyle(img, 'max-width', s + 'px');
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'top', '-50vh');
      this.renderer.setStyle(img, 'opacity', '0.3');
      this.renderer.setStyle(img, 'left', (x) + 'px');
      this.renderer.setStyle(img, 'z-index', 3000);
      this.renderer.listen(img, 'click', (event) => {
        this.popBubble(event.target);
      });
      const container = this.el.nativeElement.querySelector('.image-container');
      this.renderer.appendChild(container, img);
      gsap.from(`.${className}`, {
        duration: 8,
        y: y * 2,
        ease: "expoScale(0.5,7,none)",
        // repeat:Infinity
      });
    }
  }

  scrollToExplore() {
    gsap.from('#scroll-to-explore', {
      y: -5,
      duration: 0.5,
      repeat: Infinity,
      ease: "sine.inOut",
      yoyo: true
    })
  }

  popBubble(bubble: HTMLElement) {
    console.log(bubble);

    // Animate the clicked bubble using GSAP
    gsap.to(bubble, {
      scale: 2,          // Pop effect (scale up)
      duration: 0.2,     // Animation duration
      ease: "bounce.in",  // Smooth easing effect
      onComplete: () => {
        // Set a red border to the clicked bubble after animation
        this.renderer.setStyle(bubble, 'display', 'none');
      }
    });
  }

}

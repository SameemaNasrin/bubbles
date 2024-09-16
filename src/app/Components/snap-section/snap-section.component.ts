import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

@Component({
  selector: 'app-snap-section',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatSidenavModule, FooterSectionComponent],
  templateUrl: './snap-section.component.html',
  styleUrl: './snap-section.component.css'
})
export class SnapSectionComponent implements OnInit, AfterViewInit {
  sections = [1, 2, 3, 4, 5]; // You can adjust the sections as needed
  navs = [
    {
      "id": "#who-we-are",
      "name": "Who We Are?"
    },
    {
      "id": "#what-we-do",
      "name": "What We Do?"
    },
    {
      "id": "#our-principles",
      "name": "Our Principles"
    },
    {
      "id": "#why-choose-us",
      "name": "Why Choose Us?"
    },

    {
      "id": "#case-studies",
      "name": "Case Studies"
    },
    {
      "id": "#get-in-touch",
      "name": "Get In Touch"
    }
  ];
  principles = [
    {
      img: '/assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: '/assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: '/assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: '/assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },

  ];

  caseStudies = [
    {
      "applicationName": "Name of Application",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "/assets/Gate.svg"
    }
    // ,
    // {
    //   "applicationName": "Name of Application",
    //   "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
    //   "aplicationBackgroundImage": "/assets/Gate.svg"
    // },
    // {
    //   "applicationName": "Name of Application",
    //   "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
    //   "aplicationBackgroundImage": "/assets/Gate.svg"
    // }
  ]

  @ViewChild('footer', { static: false }) footerElement!: ElementRef; // Reference to the footer element

  contactForm: FormGroup;
  constructor(private el: ElementRef, private renderer: Renderer2, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      budgetType: ['overall', [Validators.required]],
      projectDesc: ['', [Validators.required]]
    });
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.initScrollTrigger();
  }

  ngAfterViewInit(): void {
    // document.addEventListener('scroll', () => this.scrollEventListner());
  }

  activateSnapScroll(event: Event) {
    const container = this.el.nativeElement.querySelector('.scroll-container');
    const containerPosition = container.getBoundingClientRect();
    const scrollTop = containerPosition.top;

    console.log("SNAP SCROLL" + scrollTop)
    if (scrollTop >= 0) {
      this.renderer.addClass(container, 'snap-active');
    } else {
      this.renderer.removeClass(container, 'snap-active');
    }
  }

  onSubmit(): void {
    // if (this.contactForm.valid) {
    //   console.log('Form Data:', this.contactForm.value);
    //   // You can handle form submission here (e.g., send data to the server)
    // } else {
    console.log('Form is invalid');
    // }
  }

  get form() {
    return this.contactForm.controls;
  }

  initScrollTrigger() {
    // // case study card animation
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".case-study-card",   // The video section
    //     start: "top top",          // When the top of the video reaches 40% of the viewport
    //     end: "top 10%",            // When the top of the video reaches the top of the viewport
    //     scrub: true,               // Smooth scroll behavior
    //     markers: true,
    //     onEnter: () => {
    //       // Shrink the video when reaching 40%
    //       gsap.to(".case-study-card", {
    //         scale: 0.9,            // Shrink the video frame to 90%
    //         borderRadius: '40px',
    //         duration: 1,
    //         ease: "power2.out"
    //       });
    //     },
    //     onLeaveBack: () => {
    //       // Reset the video size when scrolling back up
    //       gsap.to(".case-study-card", {
    //         scale: 1,              // Restore the original size
    //         borderRadius: '0px',
    //         duration: 1,
    //         ease: "power2.out"
    //       });
    //     }
    //   }
    // });

    // ScrollTrigger for snapping the video section into full view
    gsap.timeline({
      scrollTrigger: {
        trigger: ".case-study-card",   // The video section
        start: "bottom bottom",          // When the video reaches the top of the viewport
        pin: true,                 // Pin the video section (it stays fixed until scrolled past)
        scrub: true,               // Smooth scrolling behavior
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

  // scrollEventListner = () => {  // Use arrow function here to preserve 'this'
  //   const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const clientHeight = document.documentElement.clientHeight;
  
  //   const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
  //   console.info(scrollPercent)
  //   if (scrollPercent > 99) {// Alternatively with renderer
  //     this.renderer.setStyle(this.footerElement.nativeElement, 'display', 'block');
  //   }
  //   else {// Alternatively with renderer
  //     this.renderer.setStyle(this.footerElement.nativeElement, 'display', 'none');
  //   }
  // }
}

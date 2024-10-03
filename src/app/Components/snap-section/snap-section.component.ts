import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterSectionComponent } from '../footer-section/footer-section.component';


@Component({
  selector: 'app-snap-section',
  standalone: true,
  imports: [CarouselModule, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatSidenavModule, FooterSectionComponent],
  templateUrl: './snap-section.component.html',
  styleUrl: './snap-section.component.css'
})
export class SnapSectionComponent implements OnInit, AfterViewInit {
  sections = [1, 2, 3, 4, 5]; // You can adjust the sections as needed
  navs = [
    {
      "id": "#who-we-are-section",
      "name": "Who We Are?"
    },
    {
      "id": "#what-we-do-section",
      "name": "What We Do?"
    },
    {
      "id": "#our-principles-section",
      "name": "Our Principles"
    },
    {
      "id": "#why-choose-us-section",
      "name": "Why Choose Us?"
    },

    {
      "id": "#case-studies-section",
      "name": "Case Studies"
    },
    {
      "id": "#get-in-touch-section",
      "name": "Get In Touch"
    }
  ];
  principles = [
    {
      img: 'assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: 'assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: 'assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },
    {
      img: 'assets/Bubble.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut '
    },

  ];

  caseStudies = [
    {
      "applicationName": "Name of Application",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "2",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Bubble.svg"
    },
    {
      "applicationName": "3",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "4",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "5",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "6",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "7",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "8",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    },
    {
      "applicationName": "9",
      "tags": ['tag1', 'tag2', 'tag3', 'tag4'],
      "aplicationBackgroundImage": "assets/Gate.svg"
    }
  ];

  hoverImages = ['assets/Bubble.svg', 'assets/flower leave.svg', 'assets/star.svg', 'assets/MOCKUP 5.svg'];

  @ViewChild('footer', { static: false }) footerElement!: ElementRef; // Reference to the footer element

  contactForm: FormGroup;
  constructor(private el: ElementRef, private renderer: Renderer2, private fb: FormBuilder,
  ) {
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

  }
  ngAfterViewInit(): void {
    this.initScrollTrigger();
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
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);

      const body = {
        from_name: this.contactForm.value.name,
        to_name: 'Bubbles', // Set recipient's name
        name: this.contactForm.value.name,
        company: this.contactForm.value.company,
        contact: this.contactForm.value.contact,
        budget: this.contactForm.value.budget,
        budgetType: this.contactForm.value.budgetType, // Ensure this exists in your form
        projectDesc: this.contactForm.value.projectDesc,
        reply_to: this.contactForm.value.email, // Assuming you have an email field
      };

      // Call sendEmail and pass form data
      this.sendEmail(body);
    } else {
      console.log('Form is invalid');
    }
  }

  public sendEmail(body: any): void {
    // Map template parameters to your EmailJS template
    const templateParams = {
      from_name: body.from_name,
      to_name: body.to_name,
      name: body.name,
      company: body.company,
      contact: body.contact,
      budget: body.budget,
      budgetType: body.budgetType,
      projectDesc: body.projectDesc,
    };

    emailjs
      .send('service_vrn1bv4', 'template_b7dmdci', templateParams, 'VeruUBjIAMcmxkkXU')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  }

  getErrorMessage() {
    return 'You must enter a value';

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
    console.log('card')
    gsap.timeline({
      scrollTrigger: {
        trigger: "#case-studies",   // The video section
        start: "top top",          // When the video reaches the top of the viewport
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

  // scrollPosition = 0;
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(event: Event): void {
  //   const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //   this.scrollPosition = scrollTop;
  // }

  // getCardStyles(index: number): any {
  //   const scaleFactor = Math.max(0.8, 1 - (this.scrollPosition - (index * 200)) / 1000);
  //   const translateY = Math.max(0, (this.scrollPosition - (index * 200)) / 5);

  //   return {
  //     transform: `scale(${scaleFactor}) translateY(${translateY}px)`,
  //     zIndex: index
  //   };
  // }

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
  currCaseStudy = 0;
  popCaseStudy(ele: any) {
    // Find the clicked card and its index
    const clickedCard = ele.target.closest('.case-study-card'); // Get the closest card
    const cards = document.querySelectorAll('.case-study-card');
    const clickedIndex = Array.from(cards).indexOf(clickedCard);
    // if(this.currCaseStudy != clickedIndex){

    // }
    console.log(clickedCard)
    // console.log(this.currCaseStudy + ' ' + clickedIndex)
    // Animate prev cards
    let prevDec = 30;
    var prevScale = 1;
    for (let i = 0; i <= clickedIndex; i++) {
      const prevCard = cards[i];
      let prevY;
      if (i >= clickedIndex - 2) {
        prevY = `-${(((i) * 100) + prevDec)}%`;
        prevDec -= 10;
        prevScale = 0.8;
      }
      else {
        prevY = `-${(((i) * 100) + 10)}%`;
        prevScale = 0.8;
      }
      // Move each subsequent card to the previous card's position, relative to its current position
      gsap.to(prevCard, {
        y: prevY,
        scale: prevScale,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    let currY;
    currY = `-${100 * clickedIndex + 10}%`
    // Animate the clicked card
    gsap.to(clickedCard, {
      y: currY,           // Move the clicked card up by 10%
      scale: 0.9,         // Scale down to 0.9
      duration: 0.4,      // Animation duration
      ease: "power2.out", // Easing effect
    });

    // Animate subsequent cards to take the position of the one above
    for (let i = clickedIndex + 1; i < cards.length; i++) {
      const nextCard = cards[i];

      // Calculate the current Y position of the next card
      const currentY = parseFloat(getComputedStyle(nextCard).transform.split(',')[5]) || 0;
      let nextY;
      if (i == (clickedIndex + 1)) {
        nextY = `${-(i * 100)}%`
      }
      else {
        nextY = `${-((i * 100) - 100)}%`
      }
      // Move each subsequent card to the previous card's position, relative to its current position
      gsap.to(nextCard, {
        y: nextY, // Move the next card to the previous card's position based on its current position
        duration: 0.4,            // Animation duration
        ease: "power2.out"        // Easing effect
      });
    }
    this.currCaseStudy = clickedIndex;
  }

  showImage(event: any, pos: number) {
    // Extract the mouse coordinates from the event
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const imgSrc = this.hoverImages[pos];
    // Create an img element
    const img = document.createElement('img');
    img.src = imgSrc; // Replace with your image URL
    img.style.position = 'fixed';  // Positioning the image absolutely
    img.style.maxWidth = '20vw';  // Set image size
    img.style.height = '20vh';
    img.style.zIndex = '10000';
    img.style.left = `${mouseX}px`;
    img.style.top = `${mouseY}px`;

    img.id = 'hover-image'; // Assign an id to easily remove it later
    // Add the image to the body
    document.body.appendChild(img);
  }

  hoverImage: HTMLElement | null = null;

  // Function to update the image position based on the mouse event
  updateImgPos(event: MouseEvent) {

    console.log("update img pos" + this.hoverImage)
    // Ensure the image element is retrieved only once
    if (!this.hoverImage) {
      this.hoverImage = document.getElementById('hover-image');
    }

    // Check if the image element exists
    if (this.hoverImage) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      console.log(mouseX)
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        this.hoverImage!.style.left = `${mouseX + 10}px`;  // Offset to avoid overlap with the cursor
        this.hoverImage!.style.top = `${mouseY + 10}px`;   // Offset to avoid overlap with the cursor
      });
    }
  }


    hideImage(event: MouseEvent) {
      this.hoverImage = null;
      // Remove the image by its id
      const img = document.getElementById('hover-image');
      if (img) {
        img.remove();
      }
    }
  }
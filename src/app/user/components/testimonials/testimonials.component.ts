// import { Component, OnInit } from '@angular/core';
// import { TestimonialsService } from '../../services/testimonials.service';
// import { Testimonials } from '../../model/testimonials';

// @Component({
//   selector: 'app-testimonials',
//   templateUrl: './testimonials.component.html',
//   styleUrls: ['./testimonials.component.css']
// })
// export class TestimonialsComponent implements OnInit {

//   constructor(private testimonialsService: TestimonialsService) { }

//   testimonials: Testimonials[];
//   selectedFile: File;

//   ngOnInit() {
//     this.testimonialsService.getTestimonials().subscribe((testimonials) => {
//       this.testimonials = testimonials;
//       console.log(this.testimonials);
//     });
//   }

//   onFileChanged(event) {
//     this.selectedFile = event.target.files[0];
//     console.log(this.selectedFile);
//   }

//   onUpload(event) {
//     console.log('came here');
//     this.selectedFile = event.target.files[0];
//     this.testimonialsService.uploadImage(this.selectedFile).subscribe((file) => {
//       console.log('file uploaded successfully');
//     });
//   }

// }

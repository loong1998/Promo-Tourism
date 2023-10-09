import { Component, Input, OnInit } from "@angular/core";

interface carouselImage{
    imageSrc: string;
    imageAlt: string;
}

@Component(
    {
        selector: 'app-carousel',
        templateUrl: './carousel.component.html',
        styleUrls: ['./carousel.component.css']
    }
)

export class CarouselComponent implements OnInit{
    @Input() images: carouselImage[] = [
        {imageSrc:'assets/langkawiView.png', imageAlt:'langkawi1'},
        {imageSrc:'assets/mangrove.png', imageAlt:'langkawi2'},
        {imageSrc:'assets/sunset.png', imageAlt:'langkawi3'}
    ];
    @Input() indicators = true;
    @Input() controls =true;
    @Input() autoSlide = true;
    @Input() slideInteraval = 3000

    selectedIndex = 0;

    ngOnInit(): void {
        if(this.autoSlide){
            this.autoSideImages();
        }
    }

    autoSideImages(): void{
        //let the image slide to the next image automatically
        setInterval(
            () => {
                this.onNextClick();
            }, this.slideInteraval
            );
    }

    selectImage(index: number): void{
        //get the current index of the image
        this.selectedIndex = index;
    }

    onPrevClick(): void{
        //if the current image index = 0
        if(this.selectedIndex === 0){
            //set it back at last index in array
            this.selectedIndex = this.images.length - 1;
        }
        else{
            //decrement by one and set as new index
            this.selectedIndex--;
        }
    }

    onNextClick(): void{
        //if the current image index is last index
        if(this.selectedIndex === this.images.length - 1){
            //reset the index back to 0
            this.selectedIndex = 0;
        }
        else{
            //increment by one and set as new index
            this.selectedIndex++;
        }
    }
}
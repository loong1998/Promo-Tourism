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
        setInterval(
            () => {
                this.onNextClick();
            }, this.slideInteraval
            );
    }

    selectImage(index: number): void{
        this.selectedIndex = index;
    }

    onPrevClick(): void{
        if(this.selectedIndex === 0){
            this.selectedIndex = this.images.length - 1;
        }
        else{
            this.selectedIndex--;
        }
    }

    onNextClick(): void{
        if(this.selectedIndex === this.images.length - 1){
            this.selectedIndex = 0;
        }
        else{
            this.selectedIndex++;
        }
    }
}
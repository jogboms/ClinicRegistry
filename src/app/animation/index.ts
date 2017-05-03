import { transition, animate, state, style } from "@angular/animations";

export const SlideUpLeft =  [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    }),
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 1,
      transform: 'translateY(0%)',
    }))
  ]),
  transition(':leave', [
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }))
  ])
];

export const SlideUpDown =  [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)',
    }),
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 1,
      transform: 'translateY(0%)',
    }))
  ]),
  transition(':leave', [
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 0,
      transform: 'translateY(-100%)',
    }))
  ])
];

export const SlideLeftRight =  [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    }),
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 1,
      transform: 'translateX(0%)',
    }))
  ]),
  transition(':leave', [
    animate('750ms cubic-bezier(0.44, 1.49, 1, 1)', style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }))
  ])
];
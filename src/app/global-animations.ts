import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate
} from "@angular/animations";
export const slideInAnimation = trigger("routeAnimations", [
  transition("RoutineList <=> Routine", [
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
      })
    ]),
    query(":enter", [style({ left: "-100%" })]),
    query(":leave", animateChild()),
    group([
      query(":leave", [animate("1s ease-out", style({ left: "100%" }))]),
      query(":enter", [animate("1s ease-out", style({ left: "0%" }))])
    ]),
    query(":enter", animateChild())
  ])
]);

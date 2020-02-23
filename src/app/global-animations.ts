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
  transition("RoutineList => *", [
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
      })
    ]),
    query(":enter", [style({ left: "100%" })]),
    query(":leave", animateChild(), { optional: true }),
    group([
      query(":leave", [
        animate(
          "0.8s ease-in-out",
          style({
            transform: "translate(-100%)"
          })
        )
      ], { optional: true }),
      query(":enter", [
        animate("0.8s ease-in-out", style({ transform: "translate(-100%)" }))
      ])
    ]),
    query(":enter", animateChild())
  ]),
  transition("* => *", [
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
    query(":leave", animateChild(), { optional: true }),
    group([
      query(":leave", [
        animate("0.8s ease-in-out", style({ transform: "translate(100%)" }))
      ], { optional: true }),
      query(":enter", [
        animate("0.8s ease-in-out", style({ transform: "translate(100%)" }))
      ])
    ]),
    query(":enter", animateChild())
  ])
]);

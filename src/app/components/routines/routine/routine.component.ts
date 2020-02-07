import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestManagerService } from "../../../services/rest-manager.service";
import { ApiRoutesConstants } from "../../../constants/api-routes.constants";
import { Routine } from "../../../models/routine.model";
import { Exercise, MuscleGroups } from "../../../models/exercise.model";
import { filter, slice, find } from "lodash";
import { FormGroup, FormControl } from "@angular/forms";
import { CreateRoutineDto } from "./models/create-routine.dto";
import { MessageService } from "primeng/api";
import { ConfirmationDialogService } from "src/app/services/confirmation-dialog.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { trigger, transition, style, animate } from "@angular/animations";

export interface RoutineDay {
  name: string;
  index: number;
  exercises: Array<any>;
}

@Component({
  selector: "app-routine",
  templateUrl: "./routine.component.html",
  styleUrls: ["./routine.component.scss"]
})
export class RoutineComponent {
  public routine: CreateRoutineDto;
  public routineId: string;
  public exercises: Exercise[];
  public allExercises: Exercise[];
  public muscleGroups: string[];
  public formGroup: FormGroup;
  public days: Array<RoutineDay>;

  constructor(
    private activeRoute: ActivatedRoute,
    public restService: RestManagerService,
    private messageService: MessageService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.activeRoute.params.subscribe(res => this.loadRoutine(res.id));
    this.muscleGroups = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Abs"];
    this.days = [
      { name: "Monday", index: 1, exercises: [] },
      { name: "Tuesday", index: 2, exercises: [] },
      { name: "Wednesday", index: 3, exercises: [] },
      { name: "Thursday", index: 4, exercises: [] },
      { name: "Friday", index: 5, exercises: [] },
      { name: "Saturday", index: 6, exercises: [] },
      { name: "Sunday", index: 7, exercises: [] }
    ];
    this.formGroup = new FormGroup({
      exerciseName: new FormControl("", []),
      muscleGroup: new FormControl("", [])
    });
    this.formGroup.controls.exerciseName.valueChanges.subscribe(value => {
      this.exercises = filter(this.allExercises, (exercise: Exercise) =>
        exercise.name.toLowerCase().includes(value.toLowerCase()) ? true : false
      );
    });
    this.formGroup.controls.muscleGroup.valueChanges.subscribe(value => {
      this.exercises = filter(this.allExercises, (exercise: Exercise) =>
        this.checkMuscleGroupInExercise(exercise, value)
      );
    });
  }

  private loadRoutine(id) {
    this.routineId = id;
    if (id === "new") {
      this.routine = {
        name: "New routine",
        exercises: [],
        active: false
      };
    } else {
      this.restService
        .get(ApiRoutesConstants.ROUTINES + id)
        .subscribe(routine => {
          if (routine) {
            this.routine = {
              name: routine.name,
              exercises: routine.exerciseToRoutine,
              active: routine.active
            };
            routine.exerciseToRoutine.forEach(routineExercise => {
              this.setExerciseToDay(routineExercise);
            });
          } else {
            this.routine = null;
          }
        });
    }
    this.loadExercises();
  }

  private loadExercises() {
    this.restService.get(ApiRoutesConstants.EXERCISES).subscribe(exercises => {
      this.allExercises = exercises;
      this.exercises = slice(exercises, 0, 40);
    });
  }

  private checkMuscleGroupInExercise(exercise: Exercise, value) {
    let check = false;
    exercise.muscleGroup.forEach(group => {
      if (!check) {
        check = group === value ? true : false;
      }
    });
    return check;
  }

  public clearFilter() {
    this.formGroup.controls.muscleGroup.patchValue("");
    this.formGroup.controls.exerciseName.patchValue("");
    this.exercises = this.allExercises;
  }

  public addExercise(exercise: any, day: number) {
    const routineDay: RoutineDay = find(this.days, {
      index: day
    });
    routineDay.exercises.push(exercise.dropData);
  }

  private setExerciseToDay(routineExercise) {
    const day: RoutineDay = find(this.days, {
      index: routineExercise.day
    });
    const exercise: Exercise = find(this.exercises, {
      id: routineExercise.exerciseId
    });
    if (day && exercise) {
      day.exercises.push(exercise);
    }
  }

  public removeExercise(day, i) {
    this.days[day.index - 1].exercises.splice(i, 1);
  }

  public moveExercise(event: CdkDragDrop<string[]>, day: RoutineDay) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getRoutineExercises() {
    const routineExercise = [];
    this.days.forEach(day => {
      if (day.exercises.length > 0) {
        day.exercises.forEach(exercise => {
          routineExercise.push({
            exerciseId: exercise.id,
            day: day.index
          });
        });
      }
    });
    return routineExercise;
  }

  public saveRoutine() {
    this.routine.exercises = this.getRoutineExercises();
    this.confirmationDialogService
      .openConfirmationDialog("Save routine?")
      .subscribe(confirmation => {
        if (confirmation) {
          const route =
            this.routineId === "new"
              ? this.restService.post(ApiRoutesConstants.ROUTINES, this.routine)
              : this.restService.put(
                  ApiRoutesConstants.ROUTINES + this.routineId,
                  this.routine
                );
          route.subscribe(res => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Routine saved successfully"
            });
          });
        }
      });
  }
}

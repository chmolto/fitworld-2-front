import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestManagerService } from "../../../services/rest-manager.service";
import { ApiRoutesConstants } from "../../../constants/api-routes.constants";
import { Routine } from "../../../models/routine.model";
import { Exercise, MuscleGroups } from "../../../models/exercise.model";
import { filter, slice } from "lodash";
import { FormGroup, FormControl } from "@angular/forms";
import { CreateRoutineDto } from "./models/create-routine.dto";
import { MessageService } from "primeng/api";
import { ConfirmationDialogService } from "src/app/services/confirmation-dialog.service";
import { SortablejsOptions } from "ngx-sortablejs";
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
  public sortOptions: SortablejsOptions = {
    onUpdate: (event: any) => {
      this.updateRoutineExercises(event);
    },
    group: "normal-group"
  };
  public days: Array<{ name: string; index: number }>;
  constructor(
    private activeRoute: ActivatedRoute,
    public restService: RestManagerService,
    private messageService: MessageService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.activeRoute.params.subscribe(res => this.loadRoutine(res.id));
    this.muscleGroups = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Abs"];
    this.days = [
      { name: "Monday", index: 1 },
      { name: "Tuesday", index: 2 },
      { name: "Wednesday", index: 3 },
      { name: "Thursday", index: 4 },
      { name: "Friday", index: 5 },
      { name: "Saturday", index: 6 },
      { name: "Sunday", index: 7 }
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
    this.routine.exercises.push({
      exerciseId: exercise.dropData.id,
      day
    });
  }

  public removeExercise(id, day) {
    this.routine.exercises = filter(this.routine.exercises, exercise => {
      return exercise.exerciseId != id || exercise.day != day.index;
    });
  }

  public updateRoutineExercises(exercise){
    console.log(exercise)
  }

  public saveRoutine() {
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

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import * as fromApp from "../../ngrx/app.reducer";
import * as RecipeActions from "../../ngrx/recipe/recipe.actions";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id ? true : false;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit() {
    this.editMode
      ? this.store.dispatch(
          RecipeActions.UpdateRecipe({
            index: this.id,
            recipe: this.recipeForm.value
          })
        )
      : this.store.dispatch(RecipeActions.AddRecipe(this.recipeForm.value));
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  get ingredientsControls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  private initForm() {
    let recipeName = "";
    let recipeImageUrl = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select("recipes")
        .pipe(
          map(recipeState =>
            recipeState.recipes.find((recipe, index) => index === this.id)
          )
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImageUrl = recipe.imageUrl;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            recipe.ingredients.forEach(ingredient => {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            });
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      ingredients: recipeIngredients
    });
  }
}

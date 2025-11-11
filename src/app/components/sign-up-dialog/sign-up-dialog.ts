import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { DialogRef } from '@angular/cdk/dialog';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [ MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatAnchor,
    ReactiveFormsModule,],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between mb-6">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">
            Join us and starting shopping today
          </p>
        </div>
        <button
          tabindex="-1"
          matIconButton
          class="-mt-2 -mr-2"
          mat-dialog-close
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form action="" [formGroup]="signUpForm" class="-mt-2 flex flex-col" (ngSubmit)="signUp()" >
        <mat-form-field class="w-full mb-4">
          <input
            type="text"
            formControlName="name"
            placeholder="Enter your name"
            matInput
          />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
         <mat-form-field class="w-full mb-4">
          <input
            type="email"
            formControlName="email"
            placeholder="Enter your email"
            matInput
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
         <mat-form-field class="w-full mb-4">
          <input
            type="password"
            formControlName="password"
            placeholder="Enter your password"
            matInput
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
          <mat-form-field class="w-full mb-4">
          <input
            type="password"
            formControlName="confirmPassword"
            placeholder="Enter your password"
            matInput
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
                <button type="submit" matButton="filled" class="w-full" >
                  Create Account
                  <!-- {{store.loading()? 'Creating Account...':'Create Account'}} -->
                </button>

      </form>
      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a  class="text-blue-600 cursor-pointer" (click)="openSignInDialog()"> Sign In</a>
      </p>
    </div>
  `,
  styles: ``
})
export class SignUpDialog {
fb = inject(NonNullableFormBuilder);
store = inject(EcommerceStore)
dialogRef = inject(DialogRef)
data = inject<{checkout:boolean}>(MAT_DIALOG_DATA)
MatDialog = inject(MatDialog)

signUpForm =  this.fb.group({
  name:['john D',Validators.required],
  email:['john@test.com',Validators.required],
  password:['1234',Validators.required],
  confirmPassword:['1234',Validators.required]
})

signUp(){
  if(!this.signUpForm.valid){
    this.signUpForm.markAllAsTouched();
    return
  }

  const {name,email,password} = this.signUpForm.value
  this.store.signUp({name,email,password,dialogId:this.dialogRef.id,checkout:this.data.checkout}as SignUpParams) 
}

  openSignInDialog(){
    this.dialogRef.close();
    this.MatDialog.open(SignInDialog,{
      disableClose:true,
      data: {
        Checkout:this.data?.checkout
      }
    })
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatSuffix,
  MatPrefix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import Checkout from '../../pages/checkout/checkout';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatSuffix,
    MatInput,
    MatPrefix,
    MatAnchor,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">
            Sign in to your account to continue shopping
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
      <form
        action=""
        class="mt-6"
        [formGroup]="signInForm"
        (ngSubmit)="signIn()"
      >
        <mat-form-field class="w-full mb-4">
          <input
            type="email"
            formControlName="email"
            placeholder="Enter your email"
            matInput
          />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full mb-6">
          <input
            formControlName="password"
            placeholder="Enter your password"
            [type]="passwordVisible() ? 'text' : 'password'"
            matInput
          />
          <mat-icon matPrefix>lock</mat-icon>

          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon
              [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"
              >lock</mat-icon
            >
          </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Don't have an account?
        <a  class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()"> Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  passwordVisible = signal(false);
  data = inject<{checkout:boolean}>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef)
  MatDialog = inject(MatDialog)

  signInForm = this.fb.group({
    email: ['johnd@test.com', Validators.required],
    password: ['123', Validators.required],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.store.signIn({ email, password,checkout:this.data.checkout,dialogId:this.dialogRef.id } as SignInParams);
  }

  openSignUpDialog(){
    this.dialogRef.close();
    this.MatDialog.open(SignUpDialog,{
      disableClose:true,
      data: {
        Checkout:this.data?.checkout
      }
    })
  }
}

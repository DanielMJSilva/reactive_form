import { isNull } from "@angular/compiler/src/output/output_ast";
import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
         return null;
    }
    // password and confirmPassword are not blank, and their values are not equal
    return password && confirmPassword && (password.value !== confirmPassword.value) ?
        { 'misMatch': true} :
        null;
}
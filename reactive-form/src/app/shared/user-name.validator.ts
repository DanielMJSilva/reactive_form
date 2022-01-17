import { AbstractControl, ValidatorFn } from "@angular/forms";

//Validator for just one name
export function forbiddenNameValidador1(control: AbstractControl): {[key: string]: any}  | null {
    const forbidden = /admin/.test(control.value);
    return forbidden ? { 'forbiddenName': {value: control.value}}: null;
}
// validator "factory" for multiple names
export function forbiddenNameValidador(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any}  | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName': {value: control.value}}: null;
    }
}
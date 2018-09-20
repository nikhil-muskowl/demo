import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {

    static areEqual(formGroup: FormGroup) {
        let password: FormControl = <FormControl>formGroup.controls['password'];
        let passconf: FormControl = <FormControl>formGroup.controls['passconf'];

        if (passconf.value !== password.value) {
            return null;
        }
        return {
            areEqual: true
        }
    }


}
import { FormControl } from '@angular/forms';

export class NumberValidator {

    static isValid(control: FormControl): any {

        if (isNaN(control.value)) {
            return {
                "not a number": true
            };
        }

        return null;
    }

}
export function printAge(age) {
    console.log(age)
}

export class CustomerInformation {
    /**
     * This method will print the first name
     * @param {string} firstName 
     */
    printFirstName(firstName) {
        console.log(firstName)
    }
    
    /**
     * This method will print the last name
     * @param {string} scecondName 
     */
    printSecondname(scecondName) {
        console.log(scecondName)
    }
}

export const customerInfo = new CustomerInformation()
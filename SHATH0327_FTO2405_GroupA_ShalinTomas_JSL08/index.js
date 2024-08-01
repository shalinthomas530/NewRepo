// This one will be a little tricky. So check out this overview first: https://www.youtube.com/watch?v=sJ-c3BA-Ypo

// 1. Create a variable to store the singleton instance of the bank branch. "bankBranchInstance"
let bankBranchInstance = null;
// 2. Define a class called `BankBranch` for managing branch information.
class BankBranch {
// 3. Create a constructor that takes `branchInfo` as a parameter
   constructor(branchInfo) {
// Check if the instance already exists
    if (bankBranchInstance) {
        return bankBranchInstance;
    }
//Initialize branch information and set the instance
    this.branchInfo = branchInfo;
    bankBranchInstance = this;
   }
// 4. Add methods to the `BankBranch` class for managing branch-related information. For example, you can add a method like `getBranchInfo` to retrieve branch details.
    getBranchInfo () {
        return this.branchInfo
    }
}

// 5. In the usage section:

// Create instances of the `BankBranch` class with different branch information 
const branchA = new BankBranch({ name: "Main Branch", location: "Downtown" });
const branchB = new BankBranch({ name: "Secondary Branch", location: "Uptown"});

// Retrieve branch information 
console.log(branchA.getBranchInfo()); // { name: "Main Branch", location: "Downtown" }
console.log(branchB.getBranchInfo()); // { name: "Secondary Branch", location: "Uptown"}

// Verify that `branchA` and `branchB` are the same instance
console.log(branchA === branchB); //true

// Explanation 
// 1. Singleton Variable: I declared a variable `bankBranchInstance` to store the singleton instance 
// of the `BankBranch` class.

// 2. Class Definition: The `BankBranch`class is defined with a constructor that takes `branchInfo` as 
// an agrument.

// 3. Singleton Check: In the constructor, I checked if `BankBranchInstance` is already sets.If it is,the
// constructor returns this existing,effectively ignoring the new `branchInfo`.

// 4. Instance Initialization: If no instance exists(`BankBranchInstance` is null), a new instance is created 
// with provide `branchInfo`,and this instance is stored in `bankbranchinstance`.

// 5. Methods: The `getBranchInfo` method retrieves the branch information for the singleton instance.

// 6. Usage: When creating`branchA` and `BranchB`, both refer to the same instance of `BankBranch`.The `BankInfo` remains
// consisent across different references to ensure that there is only one set of branch information throughout the application. 
function validateSyntax() {
    let input = document.getElementById('petInput').value;
    const pattern = /^pet_2015Forrest/;
    // Validation logic goes here
    let result = ''; // Placeholder for validation result
    // TODO: Write your validation logic here
        // Check if input starts with 'pet_' and followed by alphanumeric characters
            if (pattern.test(input)) {
                result = 'valid syntax';
            } else {
                result = 'invalid syntax';
            }
            document.getElementById('result').innerText = result;
            
}
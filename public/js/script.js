// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

 
  // Bootstrap validation + custom whitespace validation for text fields and textarea
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        // Check all text inputs and textarea for only spaces
        const fields = form.querySelectorAll('input[type="text"], textarea');
        fields.forEach(field => {
          if (!field.value.match(/\S/)) {
            field.setCustomValidity('Please enter a value that is not just spaces.');
          } else {
            field.setCustomValidity('');
          }
        });
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();





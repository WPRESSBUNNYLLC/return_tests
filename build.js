
/*
  @param {all_files_to_test: array}: Functions stored in each folder.
*/

const configure = { 

    all_files_to_test: [
      './functions/example1.js',
    ],

  }

  /*
    @param {developer_input: object}: imported data
    @param {tests: array}: array of objects to run tests
    @param {allowed_types: object}: allowed return types
    @param {allowed_values: object}: allowed return values
    @param {regex_set: object}: allowed regular expressions
    @param {function_called: function}: function passed 
    @param {error_sets: array}: exported set of objects that did not pass test
  */

  var error_sets = [];
  var multiplied_sets = [];
          
  for(let i = 0; i < configure.all_files_to_test.length; i++) {

    try {

      var developer_input = require(configure.all_files_to_test[i]); 

      run_tests(
        developer_input.tests, 
        configure.all_files_to_test[i],
        false
      );

    } catch(err) {

      console.log(err.message);

    }

  }

  /*
    multiply on multiply_amount
  */

  function multiply_function_set(multiply_this_object, folder) { 
    try { 
      multiplied_sets = multiplied_sets.concat(arrays_returned(multiply_this_object));
    } catch(err) { 
      console.log(`
        error: multplying did not work in ${folder} - ${err.message}
      `);
    }
  }

  /*
    The array of objects returned 
  */

  function arrays_returned(multiply_this_object) {

    var returned_set = [];

    for(let i = 0; i < multiply_this_object.randomized.multiply_amount; i++) { 
      returned_set.push(create_single_randomized_object(
        multiply_this_object
      ));
    }

    return returned_set;

  }

  /*
    creates and returns a single randomized object
  */

  function create_single_randomized_object(attach_here) { 

    var params = {};

    var if_random_or_not_in_selected = [
      create_random_inner_param_object(attach_here.randomized.when_obj_passed),
      create_random_inner_param_array(attach_here.randomized.when_arr_passed),
      create_random_inner_param_string(), 
      create_random_inner_param_number(),
      create_random_inner_param_BigInt(), 
      create_random_inner_param_boolean(), 
      undefined, 
      null
    ];

    for(let i = 0; i < attach_here.randomized.parameters.length; i++) { 

      var current_parameter = attach_here.randomized.parameters[i]; 

      if(current_parameter === 'string') { 
        params[`test-param-string-${i}`] = create_random_inner_param_string();
      }

      else if(current_parameter === 'number') { 
        params[`test-param-number-${i}`] = create_random_inner_param_number();
      }

      else if(current_parameter === 'BigInt') { 
        params[`test-param-BigInt-${i}`] = create_random_inner_param_BigInt();
      }

      else if(current_parameter === 'object') { 
        params[`test-param-object-${i}`] = create_random_inner_param_object(attach_here.randomized.when_obj_passed);
      }

      else if(current_parameter === 'array') { 
        params[`test-param-array-${i}`] = create_random_inner_param_array(attach_here.randomized.when_arr_passed);
      }

      else if(current_parameter === 'undefined') { 
        params[`test-param-undefined-${i}`] = undefined;
      }

      else if(current_parameter === 'boolean') { 
        params[`test-param-boolean-${i}`] = create_random_inner_param_boolean();
      }

      else if(current_parameter === 'null') { 
        params[`test-param-null-${i}`] = null;
      }

      else if(current_parameter === 'random') { 
        params[`test-param-random-${i}`] = if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)];
      }

      else { 

        console.log(
          `error: please pass in a string, number,
           BigInt, object, array, undefined, or boolean. 
           defaulting to random.`
        );

        params[`test-param-random-${i}`] = if_random_or_not_in_selected[Math.floor(Math.random() * if_random_or_not_in_selected.length)];

      }

    }

    attach_here.parameters = params;
    attach_here.randomized.on = false;
    
    return attach_here;

  }

  function create_random_inner_param_string()  { 
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  function create_random_inner_param_number()  { 
    return Math.floor(Math.random() * 100000);
  }

  function create_random_inner_param_BigInt()  { 
    return Math.floor(Math.random() * 999999999999999999999);
  }

  function create_random_inner_param_object(config_and_build)  {

    var o = {}

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        o[`test-param-boolean-${i}`] = create_random_inner_param_boolean();
      }

      else if(config_and_build[i] === 'number') { 
        o[`test-param-number-${i}`] = create_random_inner_param_number();
      }

      else if(config_and_build[i] === 'string') { 
        o[`test-param-string-${i}`] = create_random_inner_param_string();
      }

      else if(config_and_build[i] === 'undefined') { 
        o[`test-param-undefined-${i}`] = undefined;
      }

      else if(config_and_build[i] === 'null') { 
        o[`test-param-null-${i}`] = null;
      }

      else if(config_and_build[i] === 'BigInt') { 
        o[`test-param-BigInt-${i}`] = create_random_inner_param_BigInt();
      }

      else { 
        o[`test-param-null-${i}`] = null;
      }

    }

    return o;

  }

  function create_random_inner_param_array(config_and_build)   { 

    var a = [];

    for(let i = 0; i < config_and_build.length; i++) { 

      if(config_and_build[i] === 'boolean') { 
        a.push(create_random_inner_param_boolean());
      }

      else if(config_and_build[i] === 'number') { 
        a.push(create_random_inner_param_number());
      }

      else if(config_and_build[i] === 'string') { 
        a.push(create_random_inner_param_string());
      }

      else if(config_and_build[i] === 'undefined') { 
        a.push(undefined);
      }

      else if(config_and_build[i] === 'null') { 
        a.push(null);
      }

      else if(config_and_build[i] === 'BigInt') { 
        a.push(create_random_inner_param_BigInt());
      } 

      else { 
        a.push(null);
      }

    }

    return a;

  }

  function create_random_inner_param_boolean() { 
    return Boolean(Math.floor(Math.random() * 2));
  }

  /*
    check tests...
  */
          
  function run_tests(tests, file_name, recurse_multiplied) {
  
    for(let i = 0; i < tests.length; i++) { 

      if(
        (typeof(tests[i]) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].randomized) !== 'object') || 
        (typeof(tests[i]) === 'object' && typeof(tests[i].index_of_set) !== 'number') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].parameters) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].function_called) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.allowed_types) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.allowed_values) !== 'object') ||
        (typeof(tests[i]) === 'object' && typeof(tests[i].unit) === 'object' && typeof(tests[i].unit.regex_set) !== 'object') 
      ) {
  
        console.log(`
          (tests-${i}) needs to be defined as an object with object
          (unit: object), (index_of_set: index), (parameters: object), (function_called: object), (randomized: object)
          with allowed_values, allowed_types and regex set OBJECTS inside of the unit object...
          each object must be with the apporopriate values in the README (last level definition for undefined to pass)
        `);

        continue;
  
      }

      try {

        if(!main_or_fallback_errors(
          tests[i].unit.allowed_types,
          tests[i].unit.allowed_values, 
          tests[i].unit.regex_set, 
          tests[i].function_called.function, 
          file_name,
          tests[i].function_called.function_name, 
          tests[i].function_called.function_directory, 
          tests[i].function_called.function_description, 
          tests[i].function_called.base_param_names,
          tests[i].function_called.on, 
          tests[i].randomized.on,
          tests[i].randomized.parameters,
          tests[i].randomized.when_obj_passed,
          tests[i].randomized.when_arr_passed,
          tests[i].randomized.multiply_amount,
        )) { 

          console.log(`
            error: index ${i} on main check ${file_name}
          `);

          continue;

        };

      } catch(err) { 

          console.log(`
            error: could not errors
            ${err.message} - ${i} - ${file_name} - ${tests[i].index_of_set}
          `);

          continue;

      }

      if(tests[i].function_called.on !== true) { 
        continue;
      }

      if(tests[i].randomized.on === true) { 
        multiply_function_set(tests[i], file_name);
        continue;
      }
  
      var params = [];
  
      for (const [key, value] of Object.entries(tests[i].parameters)) {
        params.push(value);
      }
  
      var return_value;

      try{
        return_value = tests[i].function_called.function(...params);
      } catch(err)  {
        return_value = `error processing this function: ${err.message}`;
      }

      var error_count = 0;

      var error_type = {};
  
      if(tests[i].unit.allowed_types.on === true) {
  
        if(tests[i].unit.allowed_types.values.includes(typeof(return_value)) !== true) {
    
          error_type.message = `The value returned is not within the allowed types.`;
  
          error_type.return_type =  typeof(return_value);

          error_type.return_value =  return_value;
  
          error_count++;
  
        }
  
      }

      var error_value = {}; 
  
      if(tests[i].unit.allowed_values.on === true) {
  
        if(
          typeof(return_value) === 'number' || 
          typeof(return_value) === 'BigInt' || 
          typeof(return_value) === 'string' ||  
          typeof(return_value) === 'undefined' ||  
          typeof(return_value) === 'boolean'
        ) {
  
          if(tests[i].unit.allowed_values.values.includes(return_value) !== true) {  
    
            error_value.message = `The value returned is not within the allowed values.`;
  
            error_value.return_value = return_value;
  
            error_value.return_type =  typeof(return_value);;
  
            error_count++;
  
          }
  
         } else if(typeof(return_value) === 'object') { 
  
           var match = false;
  
           for(let j = 0; j < tests[i].unit.allowed_values.values.length; j++) { 
             if(typeof(tests[i].unit.allowed_values.values[j]) === 'object') { 
              if(JSON.stringify(tests[i].unit.allowed_values.values[j]).toLowerCase().trim() === JSON.stringify(return_value).toLowerCase().trim()) { 
                match = true;
                break;
              }
             }
           }
  
           if(match === false) { 
    
            error_value.message = `The value returned is not within the allowed values.`;
  
            error_value.return_value = return_value;
  
            error_value.return_type =  typeof(return_value);;
  
            error_count++;
  
           }
  
         } else { 
  
           console.log(`
            error: the only allowed types are number, BigInt, string, boolean, undefined and object
           `);
  
         }
  
      }

      var error_rejex = {};
    
      if(tests[i].unit.regex_set.on === true) {
  
        for(let j = 0; j < tests[i].unit.regex_set.values.length; j++) {  
  
          var test_regex = test(tests[i].unit.regex_set.values[j], return_value); 
  
          if(test_regex !== true) { 
  
            error_rejex[`message-${j}`] = `The value returned does not pass`;
  
            error_rejex[`regular_expression-${j}`] = tests[i].unit.regex_set.values[j];
  
            error_rejex[`return_value-${j}`] = return_value;
    
            error_count++;
  
          }
  
        }
  
      }
  
      if(error_count > 0) { 

        var finalized_error_object = {};
        var additional_info = {};
      
        additional_info.function_name = tests[i].function_called.function_name;
        additional_info.function_directory = tests[i].function_called.function_directory;
        additional_info.function_description = tests[i].function_called.function_description;
        additional_info.base_param_names = tests[i].function_called.base_param_names;
        additional_info.allowed_values = tests[i].unit.allowed_values.values;
        additional_info.allowed_values_on = tests[i].unit.allowed_values.on;
        additional_info.allowed_types = tests[i].unit.allowed_types.values;
        additional_info.allowed_types_on = tests[i].unit.allowed_types.on;
        additional_info.regex_set = tests[i].unit.regex_set.values;
        additional_info.regex_set_on = tests[i].unit.regex_set.on;
        additional_info.function_called = tests[i].function_called.function;
        additional_info.file_name = file_name;
        additional_info.parameters = tests[i].parameters;
        additional_info.index_of_set = tests[i].index_of_set;
        additional_info.multiplied_set = recurse_multiplied;

        finalized_error_object.error_value = error_value;
        finalized_error_object.error_type = error_type;
        finalized_error_object.error_rejex = error_rejex;
        finalized_error_object.additional_info = additional_info;

        error_sets.push(finalized_error_object);

      }
  
    }

    if(recurse_multiplied === false) { 
      run_tests(multiplied_sets, file_name, true);
    }
         
  }

  /*
    Testing errors on values on defined objects
  */

  function main_or_fallback_errors(
    allowed_types, allowed_values, regex_set, 
    function_called, file_name, function_name, function_directory, 
    function_description, base_param_names, function_on, randomized_on,
    randomized_parameters, randomized_when_obj_passed,
    randomized_when_arr_passed, randomized_multiply_amount
  ) { 

    var init_errors = {};
    
    if((typeof(allowed_types) === 'object' && typeof(allowed_types.on) !== 'boolean') || 
      (typeof(allowed_types) === 'object' && (typeof(allowed_types.values) !== 'object' || Array.isArray(allowed_types.values) === false))) {
      init_errors.allowed_types = '(allowed_types) must be an object with paramters (on: boolean) and (values: array)';
    }

    if((typeof(allowed_values) === 'object' && typeof(allowed_values.on) !== 'boolean') || 
      (typeof(allowed_values) === 'object' && (typeof(allowed_values.values) !== 'object' || Array.isArray(allowed_values.values) === false))) {
      init_errors.allowed_values = '(allowed_values) must be an object with parameters (on: boolean) and (values: array)';
    }

    if((typeof(regex_set) === 'object' && typeof(regex_set.on) !== 'boolean') || 
      (typeof(regex_set) === 'object' && (typeof(regex_set.values) !== 'object' || Array.isArray(regex_set.values) === false))) {
      init_errors.regex_set = '(regex_set) must be an object with parameters (on: boolean) and (values: array)';
    }

    if(typeof(function_called) !== 'function') {
      init_errors.function_called = '(function_called) must be a function';
    }

    if(typeof(file_name) !== 'object' && typeof(file_name) !== 'string') {
      init_errors.file_name = '(file_name) must be null or a string';
    }

    if(typeof(function_name) !== 'object' && typeof(function_name) !== 'string') {
      init_errors.function_name = '(function_name) must be null or a string';
    }

    if(typeof(function_directory) !== 'object' && typeof(function_directory) !== 'string') {
      init_errors.function_directory = '(function_directory) must be null or a string';
    }

    if(typeof(function_description) !== 'object' && typeof(function_description) !== 'string') {
      init_errors.function_description = '(function_description) must be null or a string';
    }

    if(typeof(base_param_names) !== 'object' && typeof(base_param_names) !== 'string') {
      init_errors.base_param_names = '(base_param_names) must be null or a string';
    }

    if(typeof(function_on) !== 'boolean') {
      init_errors.function_on = '(function_on) must be a boolean';
    }

    if(typeof(randomized_on) !== 'boolean') {
      init_errors.randomized_on = '(randomized_on) must be a boolean';
    }

    if((typeof(randomized_parameters) !== 'object' || Array.isArray(randomized_parameters) === false)) {
      init_errors.randomized_parameters = '(randomized_parameters) must be an array';
    }

    if((typeof(randomized_when_obj_passed) !== 'object' || Array.isArray(randomized_when_obj_passed) === false)) {
      init_errors.randomized_when_obj_passed = '(randomized_when_obj_passed) must be an array';
    }

    if((typeof(randomized_when_arr_passed) !== 'object' || Array.isArray(randomized_when_arr_passed) === false)) {
      init_errors.randomized_when_arr_passed = '(randomized_when_arr_passed) must be an array';
    }

    if(typeof(randomized_multiply_amount) !== 'number' && typeof(randomized_multiply_amount) !== 'object') {
      init_errors.randomized_multiply_amount = '(randomized_multiply_amount) must be a number or null';
    }

    var size = Object.keys(init_errors).length;

    if(size > 0) { 

      for (const [key, value] of Object.entries(init_errors)) {
        console.log(`${key}: ${value} /n`);
       }    

       return false;

    }

    return true;

  }
  
  /*
    @param {regular_expression: string}: regular expression being tested
    @param {return_value: BigInt, number, string, undefined, null, object, boolean}: the value being tested against
  */
  
  function test(regular_expression, return_value) { 
    try {
      return new RegExp(regular_expression).test(return_value);
    } catch(err) { 
      return false;
    } 
  }

  /*
    export the error set
  */

  exports.errors = error_sets;

  
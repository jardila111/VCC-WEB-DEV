const task3Element = document.getElementById('task-3');

// Task 1
function newFunction() 
{
    alert('Hi There!');
}

function showName(name) 
{
    alert("Hi " + name);
}


// Task 2
newFunction();
newFunction(task3Element);
showName('Jorge');

// Task 3
task3Element.addEventListener('click', newFunction); 

// Task 4

function concatenateStrings(str1, str2, str3)
{
    const combinedText = str1 + " " + str2 + " " + str3;
    return combinedText;
}

const combineStrings = concatenateStrings("Jorge","Andres", "Ardila");;
alert(combineStrings);





document.addEventListener('DOMContentLoaded', function () {

    // Chargement des tâches depuis le localStorage lors du chargement de la page
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText) {
        tasks.push(taskText);
        saveTasks();
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
    }

    function renderTasks() {
        var taskList = document.getElementById("myUL");
        taskList.innerHTML = "";

        for (var i = 0; i < tasks.length; i++) {
            var li = document.createElement("li");
            var t = document.createTextNode(tasks[i]);
            li.className = "task";
            li.appendChild(t);

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            li.setAttribute("data-index", i); // Attribut personnalisé pour conserver l'index de la tâche

            taskList.appendChild(li);
        }
    }

    renderTasks();

    var checkButton = document.getElementById('check');
    checkButton.addEventListener('click', function () {
        var inputValue = document.getElementById("myInput").value;
        if (inputValue === '') {
            alert("Vous devez écrire quelque chose !");
        }
        else {
            addTask(inputValue);
            renderTasks(); // Réaffichez les tâches après l'ajout
        }
        document.getElementById("myInput").value = "";
    });

    // Utilisation de l'événement de délégation pour gérer les clics sur les boutons de suppression
    var taskList = document.getElementById("myUL");
    taskList.addEventListener("click", function (event) {
        if (event.target && event.target.matches("span.close")) {
            var li = event.target.parentElement;
            var index = parseInt(li.getAttribute("data-index"));
            removeTask(index);
            renderTasks(); // Réaffichez les tâches après la suppression
        }
    });

}, false);

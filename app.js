// ===========================================================
// Aktivitas 1: Membuat Array kosong untuk menyimpan seluruh data dari todoList
// ===========================================================
const todos = [];

// ===========================================================
// Aktivitas 2: Mengambil element dari html berdasarkan ID 
// ===========================================================
const formTodo = document.getElementById("todo_form");
const whatTodo = document.getElementById("task");
const whenTodo = document.getElementById("when");
const todoPending = document.getElementById("todo_pending");
const todoDone = document.getElementById("todo_done");
const searchBtn = document.getElementById("search_btn");
const searchTask = document.getElementById("search_task");
const progressBar = document.getElementById("progress");
const progressNumbers = document.getElementById("numbers");

// ===========================================================
// Aktivitas 3: Menghitung dan menampilkan fitur progress dari keseluruhan todo yang dibuat
// ===========================================================
const updateProgress = () => {
    const totalTasks = todos.length;

    const completedTasks = todos.filter(function (todo) {
        return todo.done === true;
    }).length;

    const percentage = totalTasks 
    ? (completedTasks / totalTasks) * 100 : 0;
    
    progressBar.style.width = `${percentage}%`;

    progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
};

// ===========================================================
// Aktivitas 4: Membuat tampilan untuk todo yang belum selesai dikerjakan
// ===========================================================
function createTodoPending({id, task, when, done}) {
return `<li class="todo-list">
          <div>
            <span>${task}</span>
            <p>${when}</p>
          </div>
          <i class="bi bi-check-circle-fill" 
          title="selesai" onclick="todoFinished(${id})"></i>
        </li>`;
}

// ===========================================================
// Aktivitas 5: Membuat tampilan untuk todo yang selesai dikerjakan
// ===========================================================
function createTodoDone({id, task, when, done}) {
 return `<li class="todo-list">
          <div>
            <span>${task}</span>
            <p>${when}</p>
          </div>
          <i class="bi bi-trash3-fill" 
          title="hapus" onclick="todoDelete(${id})"></i>
        </li>`;
}

// ===========================================================
// Aktivitas 6: Mengubah status todo menjadi selesai dikerjakan
// ===========================================================
function todoFinished(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id == todoId) {
            todoItem.done = true;
        }
    }

// ===========================================================
// Aktivitas 7: Menyimpan perubahan data todo ke localstorage
// ===========================================================
const todoParsed = JSON.stringify(todos);
localStorage.setItem("todo_data", todoParsed);

    renderTodo();
}

// ===========================================================
// Aktivitas 8: Menghapus data todo berdasarkan ID
// ===========================================================
function todoDelete(todoId) {
    for (const index in todos) {
        if (todos[index].id === todoId) {
            todos.splice(index, 1);
         } 
    }
// ===========================================================
// Aktivitas 9: Update data todo local storage setelah todo dihapus
// ===========================================================
const todoParsed = JSON.stringify(todos);
localStorage.setItem("todo_data", todoParsed);

    renderTodo();
}

// ===========================================================
// Aktivitas 10: Memisahkan todo berdasarkan status sudah dikerjakan atau belum
// ===========================================================
function renderTodo() {
    const todosPending = todos.filter(function (todos) {
        return todos.done == false;
    });
    const todosDone = todos.filter(function (todos) {
        return todos.done == true;
    });

// 10.1: Menampilkan todo yang belum dikerjakan & selesai dikerjakan ke halaman
    const listTodoPending = todosPending.map(function (todoList) {
        return createTodoPending(todoList);
    });
    todoPending.innerHTML = listTodoPending.join("");

     const listTodoDone = todosDone.map(function (todoList) {
        return createTodoDone(todoList);
    });
    todoDone.innerHTML = listTodoDone.join("");

// 10.2: Memghubungkan tampilan progress todo
    updateProgress();
}

// ===========================================================
// Aktivitas 11: Memproses form todo ketika dikirim
// ===========================================================
formTodo.addEventListener("submit", function (event) {
    event.preventDefault();

// ===========================================================
// Aktivitas 12: Menambahkan data todo ke dalam Array
// ===========================================================
    todos.push({
        id: +new Date(),
        task: whatTodo.value,
        when: whenTodo.value,
        done: false,
    })

// 12.1: update data todo local storage
const todoParsed = JSON.stringify(todos);
localStorage.setItem("todo_data", todoParsed);

// 12.2: mengosongkan input setelah data ditambahkan
    whatTodo.value = "";
    whenTodo.value = "";

// 12.3: Mengembalikan fokus ke input task 
    whatTodo.focus();

// 12.4: Menampilkan kembali seluruh data todo
    renderTodo();
});

// ===========================================================
// Aktivitas 13: Mengambil data todo setelah halaman dimuat
// ===========================================================
document.addEventListener("DOMContentLoaded", 
    function () {
        const dataTodo = localStorage.getItem ("todo_data");
        const data = JSON.parse(dataTodo);

// 13.1: Memasukkan data dari local storage ke dalam array todos
        if (data !== null) {
            for (const todo of data) {
                todos.push(todo);
            }
        }

// 13.2: Menampilkan kembali data todo
        renderTodo();
});

// ===========================================================
// Aktivitas 14: Proses pencarian todo 
// ===========================================================
searchBtn.addEventListener("click", function () {
    todoPending.innerHTML = "";
    todoDone.innerHTML = ""; 

// 14.1: Mencari todo berdasarkan kata kunci dan menampilkan hasil pencarian sesuai status todo
    for (const todoItem of todos) {
        if (todoItem.task.match(searchTask.value))
        {
          if (todoItem.done === false) {
            todoPending.innerHTML = createTodoPending(todoItem);
          } else {
            todoDone.innerHTML = createTodoDone(todoItem);
          }  
        }
    }
})
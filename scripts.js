var base_url = 'https://jsonplaceholder.typicode.com';
// 1.отсортировать по убыванию длины поля title
function sortPostsByTitleLengthDesc(posts) {
    return posts.sort(function(a, b) {
        return b.title.length - a.title.length;
    });
}
// 2.отсортировать по имени автора
function sortCommentsByName(comments) {
    return comments.sort(function(a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
}
// 3. Вырезаем только нужные поля у юзеров
function pickUserFields(users) {
    var result = [];
    for (var i = 0; i < users.length; i++) {
        var u = users[i];
        result.push({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            phone: u.phone
        });
    }
    return result;
}
// 4. Фильтруем задачи
function filterNotCompleted(todos) {
    var result = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed === false) {
            result.push(todos[i]);
        }
    }
    return result;
}
//А.коллбэки
// Простая функция для запросов через коллбэки
function myCallbackFetch(url, callback) {
    fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) { callback(data); });
}
function runCallbacks() {
    myCallbackFetch(base_url + '/posts', function(posts) {
        var sorted = sortPostsByTitleLengthDesc(posts);
        console.log('Коллбэки - Посты:', sorted);
    });

    myCallbackFetch(base_url + '/comments', function(comments) {
        var sorted = sortCommentsByName(comments);
        console.log('Коллбэки - Комментарии:', sorted);
    });
}
//B.промисы
function runPromises() {
    fetch(base_url + '/users')
        .then(function(res) {
            return res.json();
        })
        .then(function(users) {
            var filteredUsers = pickUserFields(users);
            console.log('Промисы - Юзеры:', filteredUsers);
        });

    fetch(base_url + '/todos')
        .then(function(res) {
            return res.json();
        })
        .then(function(todos) {
            var filteredTodos = filterNotCompleted(todos);
            console.log('Промисы - Тудушки:', filteredTodos);
        });
}
// C.async/await
async function runAsyncAwait() {
    // Получаем и сортируем посты
    var res1 = await fetch(base_url + '/posts');
    var posts = await res1.json();
    console.log('Async - Посты:', sortPostsByTitleLengthDesc(posts));
    // Получаем и сортируем комменты
    var res2 = await fetch(base_url + '/comments');
    var comments = await res2.json();
    console.log('Async - Комменты:', sortCommentsByName(comments));
    // Получаем и фильтруем юзеров
    var res3 = await fetch(base_url + '/users');
    var users = await res3.json();
    console.log('Async - Юзеры:', pickUserFields(users));
    // Получаем и фильтруем задачи
    var res4 = await fetch(base_url + '/todos');
    var todos = await res4.json();
    console.log('Async - Тудушки:', filterNotCompleted(todos));
}
// Запуск 
runCallbacks();
runPromises();
runAsyncAwait();

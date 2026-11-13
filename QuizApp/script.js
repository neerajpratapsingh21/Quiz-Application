/* ---------- helpers & storage ---------- */
const $ = s => document.querySelector(s);
const app = $('#app');
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const currentUser = () => load('qh_session', null);

/* ---------- built-in subjects (q = question, o = options, a = index of correct option) ---------- */
const parse = rows => rows.map(r => { const p = r.split('|'); return {q:p[0], o:p.slice(1,5), a:+p[5]}; });
const QUIZ_SIZE = 30;   // questions per attempt (if a subject has more than 30, 30 are picked at random)
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const SUBJECTS = [
  {id:'java', name:'Java', color:'#e76f51', desc:'Core language, OOP basics and collections.', qs:parse([
    `Which keyword stops a class from being inherited?|static|final|abstract|private|1`,
    `Default value of an int instance variable?|null|undefined|0|-1|2`,
    `Which collection rejects duplicate elements?|ArrayList|LinkedList|Vector|HashSet|3`,
    `Which method is the entry point of a Java program?|start()|main()|run()|init()|1`,
    `Which of these is NOT a primitive type?|int|boolean|String|char|2`,
    `JVM stands for?|Java Virtual Machine|Java Variable Method|Joint Virtual Module|Java Verified Machine|0`,
    `Which keyword is used to inherit a class?|implements|extends|inherits|super|1`,
    `ArrayList implements which interface?|Map|Set|List|Stack only|2`,
    `Size of an int in Java?|2 bytes|4 bytes|8 bytes|16 bytes|1`,
    `Which block always runs after try-catch?|finally|static|default|else|0`,
    `Which keyword refers to the current object?|super|this|self|current|1`,
    `Which exception is unchecked?|IOException|SQLException|NullPointerException|FileNotFoundException|2`,
    `Strings in Java are…|Mutable|Immutable|Primitive|Volatile|1`,
    `Which keyword creates an object?|make|new|alloc|create|1`,
    `Which of these is a wrapper class?|int|Integer|integer|Int|1`,
    `A subclass method with the same signature as the parent's method is…|Overloading|Overriding|Hiding|Shadowing|1`,
    `Which keyword declares a constant variable?|const|final|fixed|readonly|1`,
    `Which collection stores key-value pairs?|List|Set|Map|Queue|2`,
    `Which loop always runs at least once?|for|while|do-while|for-each|2`,
    `Which package is imported by default?|java.util|java.io|java.lang|java.net|2`,
    `Which access modifier is the most restrictive?|public|protected|default|private|3`,
    `Which class is the parent of all Java classes?|Object|Class|Super|Base|0`,
    `Which keyword throws an exception explicitly?|throws|throw|catch|raise|1`,
    `What does garbage collection do?|Frees unused memory|Compiles code|Loads classes|Encrypts data|0`,
    `Which can an interface contain (Java 8+)?|Constructors|Instance fields|Default methods|Static blocks|2`,
    `Which collection keeps insertion order and allows duplicates?|ArrayList|HashSet|TreeSet|HashMap|0`,
    `Which type stores true or false?|bit|bool|boolean|byte|2`,
    `Which operator compares object references?|=|==|equals|===|1`,
    `A static method belongs to…|The class|An object|A thread|An interface only|0`,
    `Which Java version introduced lambda expressions?|Java 5|Java 7|Java 8|Java 11|2`
  ])},
  {id:'springboot', name:'Spring Boot', color:'#2a9d5c', desc:'Annotations, starters, JPA and REST basics.', qs:parse([
    `Which annotation marks the main class and enables auto-configuration?|@SpringBootApplication|@Component|@EnableWeb|@Service|0`,
    `Which embedded server does spring-boot-starter-web use by default?|Jetty|Tomcat|Undertow|GlassFish|1`,
    `Which annotation maps a method to HTTP GET?|@PostMapping|@RequestBody|@GetMapping|@PathVariable|2`,
    `Which annotation combines @Controller and @ResponseBody?|@RestController|@Service|@Repository|@Bean|0`,
    `Default port of an embedded Spring Boot server?|80|8080|3000|9090|1`,
    `Which file holds default configuration?|application.properties|config.xml|spring.json|boot.ini|0`,
    `Which annotation injects a dependency automatically?|@Entity|@Autowired|@Table|@Id|1`,
    `Which annotation marks a JPA entity?|@Entity|@Bean|@Service|@Scope|0`,
    `Which annotation binds a URL path value to a parameter?|@RequestParam|@PathVariable|@RequestBody|@Value|1`,
    `Which annotation reads the JSON request body into an object?|@ResponseBody|@RequestBody|@Entity|@Param|1`,
    `Which Spring Data interface gives ready-made CRUD methods?|HttpClient|JpaRepository|Servlet|Thread|1`,
    `Which build tool commonly manages Spring Boot dependencies?|Maven|Figma|Excel|Postman|0`,
    `Which starter is used to build web applications?|spring-boot-starter-test|spring-boot-starter-web|spring-boot-starter-mail|spring-boot-starter-jdbc|1`,
    `Which annotation marks a business-logic class?|@Entity|@Id|@Service|@Table|2`,
    `Which annotation marks a data-access class?|@Repository|@Value|@Scope|@Lazy|0`,
    `What does Spring's IoC container do?|Compiles Java|Styles web pages|Encrypts passwords|Manages object creation and dependencies|3`,
    `Which annotation defines a bean inside a configuration class?|@Table|@Bean|@Path|@Get|1`,
    `Which module exposes health and metrics endpoints?|Lombok|DevTools|Actuator|Thymeleaf|2`,
    `Spring Boot DevTools mainly provides…|Automatic restart on code change|A database|Security rules|Docker images|0`,
    `Which annotation triggers validation of a request body?|@Lazy|@Valid|@Bean|@Order|1`,
    `ResponseEntity is used to…|Read files|Hash passwords|Write logs|Customize the HTTP status and body|3`,
    `Which annotation injects a value from configuration?|@Value|@Id|@Table|@Entity|0`,
    `Which HTTP status means a resource was created?|200|201|204|404|1`,
    `Which annotation marks the primary key field in JPA?|@Key|@Primary|@Id|@Column|2`,
    `Spring Security mainly handles…|Authentication and authorization|Database design|CSS styling|Unit conversion|0`,
    `Which file lists dependencies in a Maven project?|package.json|pom.xml|web.xml|settings.ini|1`,
    `Which annotation runs a full Spring Boot integration test?|@RunBoot|@TestApp|@BootCheck|@SpringBootTest|3`,
    `What does @Transactional do?|Opens a socket|Creates a thread|Wraps a method in a database transaction|Formats JSON|2`,
    `Which property activates a Spring profile?|spring.profiles.active|server.mode|app.env|boot.profile|0`,
    `Which annotation enables cross-origin requests on a controller?|@Allow|@CrossOrigin|@Open|@Cors|1`
  ])},
  {id:'dsa', name:'DSA', color:'#6a4c93', desc:'Complexity, structures, sorting and graphs.', qs:parse([
    `Time complexity of binary search?|O(n)|O(log n)|O(n log n)|O(1)|1`,
    `Which data structure follows LIFO order?|Queue|Array|Stack|Heap|2`,
    `Worst-case time complexity of quicksort?|O(n²)|O(n log n)|O(log n)|O(n)|0`,
    `Which data structure follows FIFO order?|Stack|Queue|Tree|Graph|1`,
    `Time to access an array element by index?|O(1)|O(n)|O(log n)|O(n²)|0`,
    `Which sorting algorithm is stable?|Quick sort|Heap sort|Selection sort|Merge sort|3`,
    `Breadth-first search uses which structure?|Stack|Queue|Heap|Trie|1`,
    `Depth-first search uses which structure?|Queue|Heap|Stack|Set|2`,
    `Height of a balanced binary tree with n nodes?|O(log n)|O(n)|O(1)|O(n²)|0`,
    `Average lookup time in a hash table?|O(n)|O(1)|O(log n)|O(n log n)|1`,
    `Inserting at the head of a linked list costs?|O(1)|O(n)|O(log n)|O(n²)|0`,
    `Inorder traversal of a BST gives…|Level order|Random order|Sorted order|Reverse order|2`,
    `Which structure implements a priority queue?|Stack|Heap|Graph|Trie|1`,
    `Worst-case time of bubble sort?|O(n)|O(n²)|O(log n)|O(n log n)|1`,
    `Time complexity of merge sort?|O(n²)|O(n)|O(n log n)|O(log n)|2`,
    `A connected graph with no cycles is a…|Tree|Heap|Stack|Matrix|0`,
    `Dijkstra's algorithm finds…|Minimum spanning tree|Cycles|Shortest paths from a source|Topological order|2`,
    `Stack space used by recursion of depth n?|O(1)|O(n)|O(log n)|O(n²)|1`,
    `Which structure suits an undo feature?|Queue|Stack|Heap|Graph|1`,
    `In a 0-indexed array heap, children of index i are…|2i+1 and 2i+2|i+1 and i+2|i/2 and i/3|2i and 3i|0`,
    `Which traversal visits the root first?|Inorder|Postorder|Preorder|None of them|2`,
    `A tree with n nodes has how many edges?|n|n-1|n+1|2n|1`,
    `Binary search requires the array to be…|Unique|Reversed|Hashed|Sorted|3`,
    `Which algorithm detects a cycle in a linked list?|Kruskal|Floyd's tortoise and hare|Prim|Dijkstra|1`,
    `Kruskal's algorithm finds…|Shortest path|Minimum spanning tree|Maximum flow|A hash|1`,
    `Time to build a heap from n elements?|O(n)|O(n log n)|O(log n)|O(n²)|0`,
    `Which collision handling uses linked lists in each bucket?|Probing|Rehashing|Chaining|Sorting|2`,
    `Best-case time of selection sort?|O(n)|O(n²)|O(log n)|O(1)|1`,
    `Amortized cost of appending to a dynamic array?|O(n)|O(log n)|O(1)|O(n²)|2`,
    `A trie is mainly used for…|Sorting numbers|Matrix math|Graph colouring|Prefix search on strings|3`
  ])},
  {id:'oops', name:'OOPs', color:'#1d70b8', desc:'Encapsulation, inheritance, polymorphism, SOLID.', qs:parse([
    `Bundling data and methods into one unit is called…|Inheritance|Polymorphism|Abstraction|Encapsulation|3`,
    `Same method name with different parameters is…|Overloading|Overriding|Shadowing|Hiding|0`,
    `Showing only essential details and hiding the rest is…|Encapsulation|Abstraction|Composition|Casting|1`,
    `Acquiring properties of a parent class is…|Polymorphism|Inheritance|Encapsulation|Abstraction|1`,
    `"Many forms" refers to…|Inheritance|Abstraction|Polymorphism|Coupling|2`,
    `A class is best described as…|A variable|A loop|A blueprint for objects|A file|2`,
    `An object is…|An instance of a class|Another name for a method|A package|A keyword|0`,
    `What is a constructor for?|Destroying an object|Printing values|Inheriting a class|Initializing an object|3`,
    `Method overriding happens between…|Two methods in one class|Parent and child classes|Two interfaces only|Two packages|1`,
    `Which is runtime polymorphism?|Overloading|Overriding|Constructors|Casting|1`,
    `Which is compile-time polymorphism?|Overriding|Interfaces|Overloading|Abstraction|2`,
    `An abstract class can contain…|Abstract and concrete methods|Only abstract methods|No methods|Only static fields|0`,
    `Which feature supports multiple inheritance of type in Java?|Abstract classes|Interfaces|Objects|Packages|1`,
    `Which modifier makes a member visible only inside its class?|public|protected|private|static|2`,
    `An "is-a" relationship is shown by…|Composition|Aggregation|Inheritance|Association|2`,
    `A "has-a" relationship is shown by…|Inheritance|Composition|Overriding|Overloading|1`,
    `Tight coupling means…|Classes are independent|There are no classes|Many interfaces exist|Classes depend strongly on each other|3`,
    `High cohesion means a class…|Has one focused purpose|Does many unrelated tasks|Has no methods|Is very large|0`,
    `In SOLID, what does the S stand for?|Simple Recursion|Single Responsibility|Static Reference|Shared Resource|1`,
    `In SOLID, what does the O stand for?|Object rule|Overload rule|Open/Closed principle|Override rule|2`,
    `A main benefit of dependency injection is…|Faster hardware|Loose coupling|Bigger classes|Global state|1`,
    `A static method can directly access…|Instance members|The this keyword|Static members|The super keyword|2`,
    `Which cannot be instantiated?|Concrete class|Final class|Abstract class|Wrapper class|2`,
    `Java achieves multiple inheritance through…|Classes|Interfaces|Packages|Enums|1`,
    `Data hiding is achieved by…|Private fields with getters and setters|Public fields|Static fields|Global variables|0`,
    `The super keyword refers to…|The current object|The child class|The parent class|A package|2`,
    `A method signature includes…|Return type only|Access modifier|Method body|Name and parameter types|3`,
    `Which copy duplicates nested objects too?|Shallow copy|Deep copy|Alias|Cast|1`,
    `Coding to an interface mainly gives…|Slower code|Duplicate code|Flexibility and loose coupling|Global variables|2`,
    `Which is an example of polymorphism?|A loop|A constant|Two variables with equal values|One reference type calling different class behaviours|3`
  ])},
  {id:'dbms', name:'DBMS', color:'#c9a227', desc:'Keys, SQL, normalization and transactions.', qs:parse([
    `Which key uniquely identifies each row in a table?|Foreign key|Candidate index|Primary key|Composite view|2`,
    `Which SQL clause filters groups after GROUP BY?|WHERE|HAVING|ORDER BY|LIMIT|1`,
    `In ACID, what does the "I" stand for?|Isolation|Integrity|Indexing|Inheritance|0`,
    `Which command removes a table completely?|DELETE|DROP|REMOVE|CLEAR|1`,
    `Which command retrieves data?|INSERT|UPDATE|SELECT|ALTER|2`,
    `What does a foreign key do?|Sorts rows|Encrypts a column|Links to another table's key|Deletes rows|2`,
    `Which normal form removes partial dependency?|1NF|2NF|3NF|BCNF|1`,
    `Which normal form removes transitive dependency?|1NF|2NF|3NF|4NF|2`,
    `Which join returns only matching rows from both tables?|INNER JOIN|LEFT JOIN|FULL JOIN|CROSS JOIN|0`,
    `What does COUNT(*) do?|Sums values|Averages values|Counts rows|Finds the maximum|2`,
    `Which is a DDL command?|SELECT|INSERT|UPDATE|CREATE|3`,
    `Which is a DML command?|ALTER|DROP|UPDATE|CREATE|2`,
    `Which is a transaction control command?|SELECT|COMMIT|DROP|ALTER|1`,
    `Atomicity means…|Speed|Backup|All-or-nothing execution|Indexing|2`,
    `Durability means…|Data is encrypted|Data is sorted|Data is duplicated|Committed data survives crashes|3`,
    `What is an index for?|Reduce columns|Speed up searches|Delete duplicates|Encrypt data|1`,
    `A UNIQUE constraint ensures…|No NULLs ever|Sorted order|No duplicate values|Numeric values only|2`,
    `NULL in SQL means…|Zero|An empty string|False|Unknown or missing value|3`,
    `A candidate key is…|A minimal set of columns that uniquely identifies rows|Any column|A sorted column|A foreign column|0`,
    `Which command empties a table quickly but keeps its structure?|DELETE|TRUNCATE|DROP|REMOVE|1`,
    `An ER diagram shows…|CPU usage|Network routes|Entities and relationships|File sizes|2`,
    `A deadlock is when…|The disk is full|Transactions wait on each other forever|A query has a syntax error|A query is slow|1`,
    `Which clause sorts the result set?|GROUP BY|HAVING|ORDER BY|WHERE|2`,
    `AVG() computes the…|Sum|Mean|Count|Minimum|1`,
    `Which is a NoSQL database?|MySQL|PostgreSQL|Oracle|MongoDB|3`,
    `A view is…|A physical backup|An index type|A virtual table from a query|A trigger|2`,
    `A trigger…|Runs only manually|Runs automatically on a table event|Is a backup|Is an index|1`,
    `Can a primary key contain NULL?|Yes|No|Only in MySQL|Only for text|1`,
    `Normalization mainly reduces…|Security|Table count|Data redundancy|Query results|2`,
    `SQL stands for…|Simple Query Logic|Structured Query Language|Sequential Query Language|Standard Quick Language|1`
  ])},
  {id:'js', name:'JavaScript', color:'#d1495b', desc:'Types, arrays, DOM, promises and async.', qs:parse([
    `Which keyword declares a block-scoped constant?|var|let|static|const|3`,
    `What does typeof null return?|"null"|"undefined"|"object"|"number"|2`,
    `Which method adds an element to the end of an array?|push()|pop()|shift()|concat()|0`,
    `Which operator checks value and type?|==|===|=|!=|1`,
    `Which is NOT a JavaScript data type?|string|boolean|float|undefined|2`,
    `Which function converts a string to an integer?|toInt()|int()|parseInt()|Number.parse()|2`,
    `NaN stands for…|No available Number|Not a Number|Null and Nothing|New and Null|1`,
    `Which method removes the last array element?|push()|shift()|pop()|unshift()|2`,
    `Which array method returns a new array of transformed items?|forEach()|find()|push()|map()|3`,
    `Arrow function syntax uses…|->|=>|::|>>|1`,
    `Which converts a JSON string to an object?|JSON.stringify()|JSON.parse()|JSON.toObject()|parse.JSON()|1`,
    `Which method selects an element by its id?|document.findId()|document.select()|document.getElementById()|document.byId()|2`,
    `Which event fires when a button is clicked?|press|tap|click|hit|2`,
    `A closure is…|A loop|A class|An error|A function that remembers its outer scope|3`,
    `Which are the states of a Promise?|pending, fulfilled, rejected|start, stop, end|open, closed|yes, no, maybe|0`,
    `An async function always returns…|A string|A Promise|An array|undefined|1`,
    `The await keyword can be used inside…|Any function|An async function|Loops only|Classes only|1`,
    `Which syntax spreads an array's elements?|&&|...|??|%%|1`,
    `Which value is falsy?|"0"|[]|{}|0|3`,
    `Which method joins array items into a string?|merge()|string()|join()|concat()|2`,
    `setTimeout is used to…|Stop execution|Run code after a delay|Loop forever|Load a file|1`,
    `Which method returns the first matching array element?|filter()|map()|find()|slice()|2`,
    `In an arrow function, "this" is…|Its own object|Inherited from the enclosing scope|Always window|Always undefined|1`,
    `Which loop iterates over an object's keys?|for...of|for...in|while|switch|1`,
    `localStorage stores…|Binary files only|Cookies only|Server data|String key-value pairs|3`,
    `Which method converts a number to a string?|toNum()|toString()|asText()|parseStr()|1`,
    `DOM stands for…|Data Object Mode|Document Object Model|Digital Output Map|Display Order Model|1`,
    `Which method does NOT mutate the original array?|push()|splice()|slice()|sort()|2`,
    `Value of an uninitialized variable?|null|0|undefined|NaN|2`,
    `Which delimiters create template literals?|Single quotes|Double quotes|Backticks|Slashes|2`
  ])}
];

const customQuizzes = () => load('qh_quizzes', []);          // always public: every user sees all of them
const attempts = () => load('qh_attempts', []);
function findQuiz(id) {
  const s = SUBJECTS.find(x => x.id === id);
  if (s) return {id:s.id, title:s.name + ' basics', subject:s.name, author:'QuizHub', builtin:true, qs:s.qs};
  return customQuizzes().find(x => x.id === id);
}

/* ---------- navigation ---------- */
function renderNav(route) {
  const u = currentUser();
  $('#nav').innerHTML = `<a class="brand" href="#home">QuizHub</a>` + (u ? `
    <a href="#home" class="${route==='home'?'on':''}">Home</a>
    <a href="#create" class="${route==='create'?'on':''}">Create quiz</a>
    <a href="#dashboard" class="${route==='dashboard'?'on':''}">Dashboard</a>
    <span>${esc(u)}</span><a href="#" id="out">Log out</a>` : '');
  const out = $('#out');
  if (out) out.onclick = e => { e.preventDefault(); localStorage.removeItem('qh_session'); location.hash = '#login'; render(); };
}

function render() {
  const [route, arg] = (location.hash.slice(1) || 'home').split('/');
  if (!currentUser()) { renderNav('login'); return loginView(); }
  renderNav(route);
  if (route === 'quiz') return quizView(arg);
  if (route === 'create') return createView();
  if (route === 'dashboard') return dashboardView();
  return homeView();
}
window.addEventListener('hashchange', render);

/* ---------- login page ---------- */
let loginMode = 'login';
function loginView() {
  app.innerHTML = `<section class="card narrow">
    <h1>Welcome to QuizHub</h1>
    <p class="muted">Take quizzes, create your own and track your scores.</p>
    <div class="tabs">
      <button class="${loginMode==='login'?'on':''}" data-m="login">Log in</button>
      <button class="${loginMode==='register'?'on':''}" data-m="register">Create account</button>
    </div>
    <label for="lu">Username</label><input id="lu" type="text" autocomplete="username">
    <label for="lp">Password</label><input id="lp" type="password" autocomplete="current-password">
    <p class="err" id="err"></p>
    <button id="go">${loginMode==='login'?'Log in':'Create account'}</button>
    <p class="muted" style="font-size:.85rem">Demo only: accounts are stored in this browser.</p>
  </section>`;
  app.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { loginMode = b.dataset.m; loginView(); });
  const submit = () => {
    const u = $('#lu').value.trim(), p = $('#lp').value, users = load('qh_users', {}), err = $('#err');
    if (u.length < 3) return err.textContent = 'Username must be at least 3 characters.';
    if (p.length < 4) return err.textContent = 'Password must be at least 4 characters.';
    if (loginMode === 'register') {
      if (users[u]) return err.textContent = 'That username is taken. Choose another.';
      users[u] = p; save('qh_users', users);
    } else if (users[u] !== p) return err.textContent = 'Wrong username or password.';
    save('qh_session', u); location.hash = '#home'; render();
  };
  $('#go').onclick = submit;
  $('#lp').onkeydown = e => { if (e.key === 'Enter') submit(); };
}

/* ---------- home page ---------- */
function homeView() {
  const list = customQuizzes();
  app.innerHTML = `<h1>Pick a subject</h1>
    <div class="grid">${SUBJECTS.map(s => `
      <article class="card subject" style="--c:${s.color}">
        <h3>${s.name}</h3><p>${s.desc}</p>
        <span class="muted">${Math.min(QUIZ_SIZE, s.qs.length)} questions</span>
        <a class="btn" href="#quiz/${s.id}">Start quiz</a>
      </article>`).join('')}</div>
    <h2 style="margin-top:2rem">Community quizzes</h2>
    ${list.length ? `<div class="grid">${list.slice().reverse().map(q => `
      <article class="card">
        <span class="tag">${esc(q.subject)}</span>
        <h3 style="margin-top:.4rem">${esc(q.title)}</h3>
        <p class="muted">By ${esc(q.author)} · ${q.qs.length} question${q.qs.length>1?'s':''}</p>
        <a class="btn" href="#quiz/${q.id}">Take quiz</a>
      </article>`).join('')}</div>`
    : `<p class="muted">No community quizzes yet. <a href="#create">Create the first one.</a></p>`}`;
}

/* ---------- take a quiz ---------- */
function quizView(id) {
  const quiz = findQuiz(id);
  if (!quiz) { app.innerHTML = `<p>Quiz not found. <a href="#home">Back to home</a></p>`; return; }
  const qs = quiz.builtin ? shuffle(quiz.qs).slice(0, QUIZ_SIZE) : quiz.qs;
  app.innerHTML = `<section class="card">
    <span class="tag">${esc(quiz.subject)}</span><h1>${esc(quiz.title)}</h1>
    <p class="muted">By ${esc(quiz.author)}</p>
    ${qs.map((q, i) => `<div class="q"><b>${i+1}. ${esc(q.q)}</b>
      ${q.o.map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}"> ${esc(o)}</label>`).join('')}</div>`).join('')}
    <p class="err" id="err"></p>
    <button id="submit">Submit answers</button></section>`;
  $('#submit').onclick = () => {
    const picks = qs.map((_, i) => { const c = app.querySelector(`input[name=q${i}]:checked`); return c ? +c.value : -1; });
    if (picks.includes(-1)) return $('#err').textContent = 'Answer every question before submitting.';
    const score = picks.filter((p, i) => p === qs[i].a).length;
    const all = attempts();
    all.push({user:currentUser(), quizId:quiz.id, title:quiz.title, score, total:qs.length, date:new Date().toISOString()});
    save('qh_attempts', all);
    app.innerHTML = `<section class="card"><h1>Your result</h1>
      <div class="score">${score} / ${qs.length}</div>
      ${qs.map((q, i) => `<div class="q"><b>${i+1}. ${esc(q.q)}</b>
        ${q.o.map((o, j) => `<div class="opt ${j===q.a?'right':(j===picks[i]?'wrong':'')}">${esc(o)}${j===q.a?' ✓':''}${j===picks[i]&&j!==q.a?' (your answer)':''}</div>`).join('')}</div>`).join('')}
      <div class="row"><a class="btn" href="#dashboard">View dashboard</a><a class="btn ghost" href="#home">Back to home</a></div></section>`;
  };
}

/* ---------- create a quiz (always public) ---------- */
function createView() {
  app.innerHTML = `<section class="card narrow" style="max-width:720px">
    <h1>Create a quiz</h1><p class="muted">Every quiz you publish is visible to all users.</p>
    <label for="ct">Title</label><input id="ct" type="text" maxlength="80">
    <label for="cs">Subject</label>
    <select id="cs">${SUBJECTS.map(s => `<option>${s.name}</option>`).join('')}<option>Other</option></select>
    <div id="qs"></div><p class="muted" id="count"></p>
    <p class="err" id="err"></p>
    <div class="row"><button class="ghost" id="addq">Add question</button><button id="pub">Publish quiz</button></div></section>`;
  const box = $('#qs'); let n = 0; const MAX = 30;
  const renumber = () => {
    [...box.children].forEach((b, i) => { b.querySelector('.num').textContent = 'Question ' + (i + 1); b.querySelector('.rm').disabled = box.children.length === 1; });
    $('#count').textContent = box.children.length + ' of ' + MAX + ' questions';
    $('#addq').disabled = box.children.length >= MAX;
  };
  const add = () => {
    if (box.children.length >= MAX) return;
    n++; const d = document.createElement('div'); d.className = 'qb';
    d.innerHTML = `<div class="qh"><b class="num"></b><button type="button" class="ghost rm">Remove question</button></div>
      <input class="qt" type="text" aria-label="Question text" placeholder="Type the question">` +
      [0,1,2,3].map(i => `<div class="opt"><input type="radio" name="c${n}" value="${i}" ${i===0?'checked':''} aria-label="Correct option ${'ABCD'[i]}"><input class="ot" type="text" placeholder="Option ${'ABCD'[i]}"></div>`).join('') +
      `<small class="muted">Select the circle next to the correct option.</small>`;
    d.querySelector('.rm').onclick = () => { d.remove(); renumber(); };
    box.appendChild(d); renumber();
  };
  add(); add();
  $('#addq').onclick = add;
  $('#pub').onclick = () => {
    const err = $('#err'), title = $('#ct').value.trim();
    if (!title) return err.textContent = 'Add a title for your quiz.';
    const qs = [];
    for (const b of box.children) {
      const q = b.querySelector('.qt').value.trim();
      const o = [...b.querySelectorAll('.ot')].map(x => x.value.trim());
      const a = +b.querySelector('input[type=radio]:checked').value;
      if (!q || o.some(x => !x)) return err.textContent = 'Fill in every question and all four options.';
      qs.push({q, o, a});
    }
    const list = customQuizzes();
    list.push({id:'c' + Date.now(), title, subject:$('#cs').value, author:currentUser(), qs});
    save('qh_quizzes', list);
    location.hash = '#home';
  };
}

/* ---------- dashboard ---------- */
function dashboardView() {
  const mine = attempts().filter(a => a.user === currentUser()).reverse();
  const avg = mine.length ? Math.round(mine.reduce((s, a) => s + a.score / a.total * 100, 0) / mine.length) : 0;
  const best = mine.length ? Math.max(...mine.map(a => Math.round(a.score / a.total * 100))) : 0;
  const created = customQuizzes().filter(q => q.author === currentUser()).length;
  app.innerHTML = `<h1>Your dashboard</h1>
    <div class="stats">
      <div class="card"><b>${mine.length}</b>Quizzes attempted</div>
      <div class="card"><b>${avg}%</b>Average score</div>
      <div class="card"><b>${best}%</b>Best score</div>
      <div class="card"><b>${created}</b>Quizzes created</div>
    </div>
    ${mine.length ? `<div class="wrap"><table><thead><tr><th>Quiz</th><th>Score</th><th>Percent</th><th>Date</th><th></th></tr></thead><tbody>
      ${mine.map(a => `<tr><td>${esc(a.title)}</td><td><span class="pill">${a.score} / ${a.total}</span></td>
        <td>${Math.round(a.score / a.total * 100)}%</td><td>${new Date(a.date).toLocaleString()}</td>
        <td><a href="#quiz/${a.quizId}">Retake</a></td></tr>`).join('')}</tbody></table></div>`
    : `<p class="muted">You haven't attempted any quiz yet. <a href="#home">Pick a subject to start.</a></p>`}`;
}

render();

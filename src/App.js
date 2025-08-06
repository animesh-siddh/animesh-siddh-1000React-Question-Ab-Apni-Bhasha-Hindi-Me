import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, Code, Globe, Package, Server, FileText, Zap, GitBranch } from 'lucide-react';

const QAApp = () => {
  // State variables for managing search term, expanded items, filtered questions, and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set()); // Using a Set for efficient lookups
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Define the main Q&A data array. This was missing in the previous snippet.
 
const qaData = [
  {
    id: 1,
    question: "What is React?",
    answer: "React ek popular JavaScript library hai jo user interfaces (UI) banane ke liye use hoti hai. Ye component-based architecture follow karti hai, jismein UI ko chhote, independent aur reusable components mein divide kiya jata hai. React virtual DOM ka use karke efficient rendering provide karti hai, jisse performance improve hoti hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 2,
    question: "What is Virtual DOM?",
    answer: "Virtual DOM (VDOM) ek virtual copy hota hai real DOM ka. Jab component me changes aate hain (jaise state ya props change), React pehle virtual DOM update karta hai. Phir React old aur new virtual DOM ko compare karta hai aur sirf jo changes hue hain unhi parts ko real DOM me update karta hai — isse app fast aur efficient ban jata hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 3,
    question: "What are Components in React?",
    answer: "Components React ke UI ke building blocks hote hain. Ye independent aur reusable pieces of UI hote hain. Do tarah ke components hote hain: (1) Functional Components — jo simple JS function hote hain aur JSX return karte hain; modern React me ye prefer kiye jate hain. (2) Class Components — jo JavaScript class ke form me likhe jate hain aur lifecycle methods use karte hain.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 4,
    question: "What are Props?",
    answer: "Props (short for properties) React me parent component se child component ko data pass karne ka tarika hai. Props read-only hote hain, matlab child component unhe change nahi kar sakta. Props ka use component reuse aur customization ke liye hota hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 5,
    question: "What is State?",
    answer: "State ek JS object hota hai jo kisi component ke dynamic data ko hold karta hai. Jab state update hoti hai, component automatically re-render hota hai. Functional components me state handle karne ke liye `useState` hook ka use kiya jata hai. State UI ke behavior ko control karti hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 6,
    question: "What is CORS?",
    answer: "CORS ka full form hai Cross-Origin Resource Sharing. Jab frontend aur backend alag domains ya ports par hote hain, tab browser security ke liye CORS policy lagata hai. Agar proper headers backend se nahi milte, to request block ho jati hai. Same-origin me CORS ki zarurat nahi hoti.",
    category: "web",
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 7,
    question: "What is Git?",
    answer: "Git ek version control system hai jisme hum apne code ke changes ka record rakh sakte hain. Ye hume har change ka snapshot deta hai jise hum track ya revert kar sakte hain. Git me `init`, `add`, `commit`, `push`, `pull` jaise commands use hote hain aur ye collaboration ke liye bahut important tool hai.",
    category: "tools",
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    id: 8,
    question: "What is Github/Gitlab?",
    answer: "GitHub aur GitLab web-based platforms hain jaha hum apni Git repositories ko online store kar sakte hain. Ye platforms version control ke sath-sath team collaboration, code review, issue tracking aur CI/CD features provide karte hain.",
    category: "tools",
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    id: 9,
    question: "What is NPM?",
    answer: "NPM ka full form hai Node Package Manager. Ye ek tool hai jiske through hum open-source JavaScript packages ko install, update aur manage kar sakte hain. NPM ke saath npmjs.com platform aata hai jaha developers apne packages publish karte hain.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 10,
    question: "What is package.json and package-lock.json?",
    answer: "package.json ek configuration file hai jisme project ke name, version, author, scripts aur dependencies defined hoti hain. package-lock.json ek auto-generated file hai jo exact installed versions ko lock karta hai — isse ensure hota hai ki sab developers ke system me same versions install hon.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 11,
    question: "What is Carat and Tilde?",
    answer: "Carat (^) latest minor version tak allow karta hai. e.g., ^1.2.3 means: >=1.2.3 but <2.0.0. Tilde (~) sirf patch updates allow karta hai, e.g., ~1.2.3 means: >=1.2.3 but <1.3.0. Carat zyada flexible hota hai compare to tilde.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 12,
    question: "What is Dependency and Dev Dependency?",
    answer: "Dependencies production ke time chahiye hote hain, jaise React, axios. DevDependencies sirf development ke dauran chahiye jaise eslint, testing libraries. Inko hum `package.json` me alag define karte hain jisse production me unnecessary packages na jayein.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 13,
    question: "What is Node Module?",
    answer: "`node_modules` folder me sabhi install kiye gaye packages aur unki sub-dependencies store hoti hain. Jab hum `npm install` chalate hain to yahi folder ban kar sari dependencies ko store karta hai.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 14,
    question: "What is NPX?",
    answer: "NPX (Node Package Execute) ek command line tool hai jisse hum bina globally install kiye kisi npm package ko directly run kar sakte hain. Jaise `npx create-react-app myapp` command se hum create-react-app ko run karte hain bina install kiye.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 15,
    question: "What is npm ci?",
    answer: "`npm ci` ka matlab hai clean install. Ye command pehle `node_modules` folder ko delete karta hai aur `package-lock.json` ke exact versions ke packages ko install karta hai. CI/CD pipelines me ye recommended hai.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 16,
    question: "What is Build in React?",
    answer: "Build process me React app ka code compress aur optimize kiya jata hai taaki vo production ready ban jaye. `npm run build` command se build folder generate hota hai jise kisi bhi server par host kiya ja sakta hai.",
    category: "build",
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 17,
    question: "What is Webpack, Parcel and Vite?",
    answer: "Ye teeno bundlers hain jo humare code ko bundle aur optimize karte hain. Webpack zyada customizable hai, Parcel zero config setup deta hai, aur Vite fastest hota hai dev server ke liye. In sabme HMR (Hot Module Replacement) support hoti hai.",
    category: "build",
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 18,
    question: "What is the difference between `npm update` and `npm install`?",
    answer: "`npm install` command dependencies ko install karta he jo `package.json` aur `package-lock.json` me defined hoti hain. Agar `^` (carat) ya `~` (tilde) laga ho to update hone ke chances hote hain, lekin `package-lock.json` file update nahi hoti jab tak aap usse delete na karein.\n\n`npm update` command dependencies ko update karta he according to the version rules (carat/tilde) without deleting `package-lock.json`. Ye file automatically update hoti he.\n\n`npm ci`: Ye command `node_modules` folder ko delete karta he aur `package-lock.json` me jo exact version likha hota he wahi install karta he — fast and reproducible build ke liye.\n\n`npm i`: Agar `package-lock.json` aur `package.json` me mismatch hota he to `npm i` dependency ko `package.json` se install karta he aur `package-lock.json` ko update kar deta he.",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 19,
    question: "What are the features/uses of Parcel?",
    answer: "Parcel ek zero-config bundler he jo modern JavaScript apps ke liye use hota he. Iske kuch key features:\n- Dev Build\n- Local Development Server\n- HMR (Hot Module Replacement)\n- File Watching Algorithm (written in C++)\n- Caching for Faster Builds\n- Image Optimization\n- Minification\n- Bundling\n- Compression\n- Content Hashing\n- Code Splitting\n- Differential Bundling (supports old browsers)\n- Diagnostics and Error Handling\n- HTTPS Support\n- Tree Shaking (remove unused code)",
    category: "build",
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 20,
    question: "What is Browserslist?",
    answer: "Browserslist ek config hoti he jisse hum define karte hain ki humare project ka code kin browsers ke liye compatible hona chahiye. React, Parcel, Babel, etc. isi list ke basis pe code ko transpile aur optimize karte hain.\n\nEk example:\n```json\n\"browserslist\": [\n  \">0.2%\",\n  \"not dead\",\n  \"not op_mini all\"\n]\n```\nReact = PM Modi, Parcel = Amit Shah, aur sab npm packages = Mantri. Ye sab milke ek react app ka sarkar chalate hain 😄",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 21,
    question: "What is a Server?",
    answer: "Server ek powerful computer hota he jo client computers ko data, websites, aur services provide karta he.\n\nTypes of servers:\n- **Database Server**: data provide karta he\n- **Web Server**: website (HTML/CSS/JS) serve karta he\n- **Game Server**: multiplayer game platform deta he\n- **File Server**: file sharing allow karta he\n- **Email Server**: email receive/send/manage karta he",
    category: "server",
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 22,
    question: "How does a builder create a local server?",
    answer: "Jab hum `npm start` chalate hain, to React-scripts (builder) automatically ek local development server run karta he using Node.js.\n\nProcess:\n1. `npm start`\n2. React builder run hota he (like `react-scripts`)\n3. Node.js dev server create hota he\n4. App browser me load hota he at `http://localhost:3000`",
    category: "server",
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 23,
    question: "What is `type=\"module\"` in Script Tag?",
    answer: "Jab hum `<script type=\"module\">` use karte hain, tab browser ko batate hain ki ye JavaScript file ek module hai. Iska matlab:\n- Aap is file me `import` aur `export` ka use kar sakte ho\n- Module scoped hota hai (global variables nahi bante)\n- Module automatically strict mode me chalta hai\n\nModules = JavaScript files jo reusable aur encapsulated hote hain.",
    category: "web",
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 24,
    question: "Difference between `npm start` and `npm run start`?",
    answer: "`npm start` ek shortcut he jo internally `npm run start` hi execute karta he. Ye sirf `start` script ke liye kaam karta he. \n\nExample:\n```json\n\"scripts\": {\n  \"start\": \"react-scripts start\",\n  \"build\": \"react-scripts build\"\n}\n```\n\n- `npm start` → valid  \n- `npm run start` → valid  \n- `npm build` → ❌ invalid (because `build` special script nahi hai)\n- `npm run build` →   valid",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 25,
    question: "How does a React element become an HTML element?",
    answer: "React element ko `React.createElement` ke through JavaScript object me convert kiya jata he. Jab ye object `root.render()` me diya jata he, tab React isse real DOM element (HTML) me convert karta he.\n\nFlow:\nJSX → `React.createElement()` → JS Object → `root.render()` → Real DOM (HTML)",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 26,
    question: "What is Rendering in React?",
    answer: "Rendering React me ek process he jisme hum JavaScript code ke basis par HTML structure define karte hain. Jab `render()` function call hota he, tab UI browser me dikhta he. \n\nRendering ka main kaam hota he: \n- Component ko HTML me convert karna\n- State/props ke hisab se UI ko update karna",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 27,
    question: "Does ReactDOM.render replace or update the root content?",
    answer: "`ReactDOM.render()` purane root element ke andar ke content ko **replace** karta he, aur naye React element ko usme inject karta he.\n\nAgar pehle se kuch content ho root element me, to wo remove ho jata he.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 28,
    question: "How is JSX different from HTML?",
    answer: "JSX ka syntax HTML jaisa dikhta hai, lekin vo HTML nahi hai. JSX JavaScript ka part hota hai jo React elements banata hai.\n\nMajor differences:\n- `class` ki jagah `className`\n- `for` ki jagah `htmlFor`\n- Curly braces `{}` ke andar expressions likhe ja sakte hain\n- JSX compile hota hai `React.createElement` calls me",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 29,
    question: "What is the process of rendering by a React element?",
    answer: "1. Hum JSX likhte hain: `const element = <h1>Hello</h1>`\n2. Babel us JSX ko transpile karta hai into `React.createElement()`\n3. Ye function ek JS object return karta hai\n4. `root.render(element)` call karne se ye object HTML me convert hota hai aur DOM me inject hota hai\n\nFlow:\nJSX → `React.createElement()` → JS Object → `render()` → HTML",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 30,
    question: "What is Babel?",
    answer: "Babel ek JavaScript compiler hai jo modern JavaScript (ES6+) aur JSX ko purane compatible JavaScript me convert karta hai.\n\nReact me Babel ka kaam:\n- JSX ko `React.createElement` me transpile karna\n- Modern JS features ko browser-compatible banana\n\nYe build step me use hota hai (jaise Webpack/Parcel ke sath).",
    category: "tools",
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 31,
    question: "How is JSX `prop` different from HTML attribute?",
    answer: "JSX me `props` JavaScript expressions hote hain, jabki HTML me attributes string-based hote hain.\n\nDifferences:\n- JSX uses camelCase (`className`, `htmlFor`)\n- `{}` ke andar JavaScript expressions likhe ja sakte hain\n- JSX dynamic hote hain, HTML static",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 32,
    question: "How many types of Components are there?",
    answer: "React me do types ke components hote hain:\n\n1. **Functional Component**:\n- JavaScript functions hote hain\n- JSX return karte hain\n- Modern React me Hooks ke sath use hote hain\n\n2. **Class Component**:\n- JavaScript class ke roop me likhe jate hain\n- `render()` method use hota hai\n- Pehle zyada common the, ab mostly hooks prefer kiye jate hain",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 33,
    question: "What is the difference between React Element and React Component?",
    answer: "**React Element:**\n- Ek simple object hota hai jo UI ka representation hota hai\n- JSX ya `React.createElement()` se banta hai\n- Immutable hota hai\n```js\nconst heading = <h1>Hello</h1>;\nReactDOM.render(heading, document.getElementById(\"root\"));\n```\n\n **React Component:**\n- Function ya class hoti hai jo React elements return karti hai\n```js\nconst Heading = () => <h1>Hello</h1>;\nReactDOM.render(<Heading />, document.getElementById(\"root\"));\n```",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 34,
    question: "How does JSX prevent us from Cross Site Scripting (XSS) attacks?",
    answer: "JSX automatically HTML escaping karta hai — iska matlab agar koi user `<script>` ya koi malicious input de, toh vo plain text ban jata hai aur browser me execute nahi hota.\n\nExample:\n```js\nconst userInput = \"<script>alert('hacked')</script>\";\n<h1>{userInput}</h1>\n```\nOutput me browser `<script>` tag ko execute nahi karega — sirf text dikhayega.\n\n  Is wajah se JSX XSS attacks se bachav karta hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 35,
    question: "How do we use JavaScript within JSX?",
    answer: "JSX ke andar JavaScript expression likhne ke liye `{}` ka use hota hai.\n\nExample:\n```js\nconst FunctionalComponent = () => (\n  <div>\n    {title}               // variable\n    {100 + 200}           // expression\n    <Heading />           // component\n    {Heading()}           // function call\n    {\"I am here \" + 123}  // string concat\n    <h1>Hello JSX</h1>\n  </div>\n);\n```\n  JSX me `{}` ke andar har valid JS expression likh sakte hain — conditionals, variables, functions, etc.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
    {
    id: 36,
    question: "What is JSX?",
    answer: "JSX ek syntax extension hai jo HTML jaise dikhne wale code ko JavaScript me likhne deta hai. React me JSX ko Babel convert karta hai into `React.createElement` calls, jo ek JS object return karta hai. Fir React us object ko DOM me render karta hai.",
    category: "react",
    icon: <Code className="w-5 h-5" />
  },
  {
  id: 37,
  question: "Virtual DOM memory me kaha store hota hai?",
  answer:
    "Virtual DOM ek JavaScript object hota hai jo React banata hai, lekin ye browser ke JavaScript Engine (jaise Chrome ka V8) ki memory me store hota hai. React ki apni koi memory nahi hoti — sab kuch browser ke JS environment me run hota hai. Isliye virtual DOM sirf ek logical layer hai jo real DOM se pehle memory me manage ki jati hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 38,
  question: "Virtual DOM render hone se pehle ban jata hai kya?",
  answer:
    "Haan! React.createElement se virtual DOM pehle hi ban jata hai. Uske baad React old aur new virtual DOM ko compare karta hai (reconciliation), fir ReactDOM.render ke zariye final real DOM update hota hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 39,
  question: "Kya React Virtual DOM me head ya body tag hota hai?",
  answer: "Nahi. Virtual DOM sirf usi part ka representation hota hai jo React ke control me hota hai — usually root div ke andar ka. <html>, <head>, aur <body> tags React manage nahi karta, wo static HTML file me hote hain.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 40,
  question: "What is the difference between JS and JSX extension?",
  answer: "JS aur JSX dono me end result JavaScript hi hota hai. JSX ek syntax extension hai jo React me HTML-like code likhne ki facility deta hai. Babel JSX ko JavaScript me convert karta hai jo React.createElement calls me badal jata hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 41,
  question: "What is Named Export?",
  answer: "Named export tab use hota hai jab ek file se multiple values export karni ho. Import karte waqt wahi naam use karna padta hai jo export hua hai. Example: import { resList } from './utils/constants'.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 42,
  question: "What is Default Export?",
  answer: "Default export tab use hota hai jab ek file me ek hi main component ya value export karni ho. Import karte waqt ise custom naam se import kiya ja sakta hai. Example: import MyComponent from './MyComponent'.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 43,
  question: "Can I use default export with named export?",
  answer: "Haan, ek file me default export aur named export dono ek saath use kiye ja sakte hain. JavaScript me koi restriction nahi hai. General practice me agar ek file me ek hi main component ho to default export use hota hai, aur agar multiple exports ho to named exports ka use hota hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 44,
  question: "Why React is Fast?",
  answer: "React fast hai kyunki ye Virtual DOM ka use karke DOM manipulation ko optimize karta hai. Ye Virtual DOM banata hai, purane Virtual DOM ke saath compare karta hai (diffing algorithm use karke) aur sirf changed parts ko Actual DOM me update karta hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 45,
  question: "What is React Fiber?",
  answer: "React Fiber ek reconciliation engine hai jo React 16 me introduce hua tha. Ye rendering ko flexible aur interruptible banata hai. Ye rendering ka kaam small chunks me tod kar karta hai aur diffing algorithm ka use karke old aur new Virtual DOM compare karta hai. Isse React asynchronous rendering provide karta hai, jisse updates ko pause, resume aur prioritize kiya ja sakta hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 46,
  question: "What is React Reconciliation?",
  answer: "React Reconciliation ek process hai jisme React new Virtual DOM ko previous Virtual DOM ke saath compare karta hai (diffing algorithm ka use karke) aur jo changes detect hote hain unhe efficiently Actual DOM me update karta hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 47,
  question: "What is Incremental Rendering?",
  answer: "Incremental rendering ka matlab hai pura UI ek saath render karne ke bajaye usko chhote-chhote chunks me tod kar render karna. Isse high-priority UI elements pehle load hote hain, page jaldi render hota hai aur user experience improve hota hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 48,
  question: "What is State?",
  answer: "State ek React component ka special data storage hota hai jisme component-specific dynamic data store hota hai. Jab state change hoti hai, React component ko re-render karta hai taaki UI latest data ke saath update ho.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 49,
  question: "Why is State a powerful variable?",
  answer: "State powerful hai kyunki ye sirf data store nahi karta, balki UI ke behaviour ko control karta hai. State change hone par component automatic re-render hota hai aur UI latest data ke saath sync me rehta hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 50,
  question: "What is useState Hook?",
  answer: "useState ek React Hook hai jo functional components me state manage karne ke liye use hota hai. Ye ek array return karta hai — pehla element state value hota hai, aur dusra element state update karne ka function hota hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 51,
  question: "What is Diffing Algorithm?",
  answer: "Diffing algorithm ek comparison process hai jisme React old Virtual DOM aur new Virtual DOM ko compare karke sirf changed parts ko Actual DOM me update karta hai. Isse rendering fast hoti hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 52,
  question: "Is Virtual DOM a JavaScript Object?",
  answer: "Haan, Virtual DOM ek JavaScript object hota hai jo Actual DOM ka lightweight representation hota hai. First render me poora Virtual DOM tree Actual DOM me mount hota hai. Re-render me naya Virtual DOM banakar purane se compare hota hai aur sirf changes update hote hain.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 53,
  question: "What is Re-rendering?",
  answer: "Re-rendering wo process hai jisme state ya props change hone par React component ka naya Virtual DOM banata hai, purane Virtual DOM se compare karta hai aur jo changes hote hain unhe Actual DOM me update karta hai.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
{
  id: 54,
  question: "What is CONFIG DRIVEN UI?",
  answer: "Config Driven UI ka matlab hai ki aap UI ko manually hardcode nahi karte, balki ek config (jaise array of objects) ke through dynamically banaate ho. Is config me define hota hai — kaunse fields, kaunsa type, label, validation, etc. Isse ek hi component ko multiple jagah reuse kiya ja sakta hai by just changing the config.",
  category: "react",
  icon: <Code className="w-5 h-5" />
},
    
];

  // Define categories for filtering and display
  const categories = [
    { id: 'all', name: 'All Topics', icon: <BookOpen className="w-4 h-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'react', name: 'React', icon: <Code className="w-4 h-4" />, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'web', name: 'Web Tech', icon: <Globe className="w-4 h-4" />, color: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { id: 'tools', name: 'Dev Tools', icon: <Package className="w-4 h-4" />, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'build', name: 'Build Tools', icon: <Zap className="w-4 h-4" />, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { id: 'server', name: 'Server', icon: <Server className="w-4 h-4" />, color: 'bg-gradient-to-r from-indigo-500 to-purple-500' }
  ];

  // Effect hook to filter questions based on search term and selected category
  useEffect(() => {
    let filtered = qaData; // Start with all data

    // Filter by category if one is selected (not 'all')
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term if provided
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered); // Update the state with filtered questions
  }, [searchTerm, selectedCategory]); // Dependencies: re-run when search term or category changes

  // Function to toggle the expanded state of a Q&A item
  const toggleExpanded = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev); // Create a new Set to avoid direct mutation
      if (newSet.has(id)) {
        newSet.delete(id); // If already expanded, collapse it
      } else {
        newSet.add(id); // If collapsed, expand it
      }
      return newSet; // Return the updated Set
    });
  };

  // Function to highlight search terms in text
  const highlightText = (text, highlight) => {
    if (!highlight) return text; // If no highlight term, return original text

    // Escape special regular expression characters in the highlight term
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Split the text by the highlight term (case-insensitive, global)
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

    // Map over the parts to apply highlighting
    return parts.map((part, index) =>
      part.toLowerCase() === escapedHighlight.toLowerCase() ? // Check if the part matches the highlight term
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">{part}</mark> : part
    );
  };

  return (
    // Main container with a gradient background, min-height for full screen
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter">
      {/* Container for content, centered with padding */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Main title with gradient text */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            React Q&A Hub
          </h1>
          {/* Subtitle */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master React development with this comprehensive collection of questions and answers
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          {/* Search icon */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* Input field for search */}
          <input
            type="text"
            placeholder="Search questions and answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Category Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg scale-105` // Styles for selected category
                  : 'bg-white/10 text-gray-300 hover:bg-white/20' // Styles for unselected category
              }`}
            >
              {category.icon} {/* Category icon */}
              <span className="font-medium">{category.name}</span> {/* Category name */}
            </button>
          ))}
        </div>

        {/* Results Count Display */}
        <div className="text-center mb-6">
          <p className="text-gray-300">
            Showing {filteredQuestions.length} of {qaData.length} questions
          </p>
        </div>

        {/* Questions List Section */}
        <div className="space-y-6">
          {filteredQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300"
            >
              {/* Question header, clickable to toggle expansion */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleExpanded(item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon circle */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      {/* Question text with highlighting */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Q{item.id}. {highlightText(item.question, searchTerm)}
                      </h3>
                      {/* Category tag */}
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="capitalize bg-white/10 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Expand/Collapse button */}
                  <button className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors">
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Answer section, conditionally rendered based on expanded state */}
              {expandedItems.has(item.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-white/20 pt-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      {/* Answer heading */}
                      <h4 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Answer:
                      </h4>
                      {/* Answer text with highlighting, preserving line breaks */}
                      <div className="text-gray-200 leading-relaxed whitespace-pre-line">
                        {highlightText(item.answer, searchTerm)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message when no filtered questions are found */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-gray-400">
            Happy Learning! 🚀 Master React development step by step
          </p>
        </div>
      </div>
    </div>
  );
};

export default QAApp;

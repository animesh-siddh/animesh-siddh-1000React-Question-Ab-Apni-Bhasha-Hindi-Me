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
      icon: <Code className=\w-5 h-5\" />
    },
    {
      id: 2,
      question: "What is Virtual DOM?",
      answer: "Virtual DOM (VDOM) ek virtual copy hota hai real DOM ka. Jab component me changes aate hain (jaise state ya props change), React pehle virtual DOM update karta hai. Phir React old aur new virtual DOM ko compare karta hai aur sirf jo changes hue hain unhi parts ko real DOM me update karta hai — isse app fast aur efficient ban jata hai.",
      category: "react",
      icon: <Code className=\"w-5 h-5\" />
    },
    {
      id: 3,
      question: "What are Components in React?",
      answer: "Components React ke UI ke building blocks hote hain. Ye independent aur reusable pieces of UI hote hain. Do tarah ke components hote hain: (1) Functional Components — jo simple JS function hote hain aur JSX return karte hain; modern React me ye prefer kiye jate hain. (2) Class Components — jo JavaScript class ke form me likhe jate hain aur lifecycle methods use karte hain.",
      category: "react",
      icon: <Code className=\"w-5 h-5\" />
    },
    {
      id: 4,
      question: "What are Props?",
      answer: "Props (short for properties) React me parent component se child component ko data pass karne ka tarika hai. Props read-only hote hain, matlab child component unhe change nahi kar sakta. Props ka use component reuse aur customization ke liye hota hai.",
      category: "react",
      icon: <Code className=\"w-5 h-5\" />
    },
    {
      id: 5,
      question: "What is State?",
      answer: "State ek JS object hota hai jo kisi component ke dynamic data ko hold karta hai. Jab state update hoti hai, component automatically re-render hota hai. Functional components me state handle karne ke liye `useState` hook ka use kiya jata hai. State UI ke behavior ko control karti hai.",
      category: "react",
      icon: <Code className=\"w-5 h-5\" />
    },
    {
      id: 6,
      question: "What is CORS?",
      answer: "CORS ka full form hai Cross-Origin Resource Sharing. Jab frontend aur backend alag domains ya ports par hote hain, tab browser security ke liye CORS policy lagata hai. Agar proper headers backend se nahi milte, to request block ho jati hai. Same-origin me CORS ki zarurat nahi hoti.",
      category: "web",
      icon: <Globe className=\"w-5 h-5\" />
    },
    {
      id: 7,
      question: "What is Git?",
      answer: "Git ek version control system hai jisme hum apne code ke changes ka record rakh sakte hain. Ye hume har change ka snapshot deta hai jise hum track ya revert kar sakte hain. Git me `init`, `add`, `commit`, `push`, `pull` jaise commands use hote hain aur ye collaboration ke liye bahut important tool hai.",
      category: "tools",
      icon: <GitBranch className=\"w-5 h-5\" />
    },
    {
      id: 8,
      question: "What is Github/Gitlab?",
      answer: "GitHub aur GitLab web-based platforms hain jaha hum apni Git repositories ko online store kar sakte hain. Ye platforms version control ke sath-sath team collaboration, code review, issue tracking aur CI/CD features provide karte hain.",
      category: "tools",
      icon: <GitBranch className=\"w-5 h-5\" />
    },
    {
      id: 9,
      question: "What is NPM?",
      answer: "NPM ka full form hai Node Package Manager. Ye ek tool hai jiske through hum open-source JavaScript packages ko install, update aur manage kar sakte hain. NPM ke saath npmjs.com platform aata hai jaha developers apne packages publish karte hain.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 10,
      question: "What is package.json and package-lock.json?",
      answer: "package.json ek configuration file hai jisme project ke name, version, author, scripts aur dependencies defined hoti hain. package-lock.json ek auto-generated file hai jo exact installed versions ko lock karta hai — isse ensure hota hai ki sab developers ke system me same versions install hon.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 11,
      question: "What is Carat and Tilde?",
      answer: "Carat (^) latest minor version tak allow karta hai. e.g., ^1.2.3 means: >=1.2.3 but <2.0.0. Tilde (~) sirf patch updates allow karta hai, e.g., ~1.2.3 means: >=1.2.3 but <1.3.0. Carat zyada flexible hota hai compare to tilde.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 12,
      question: "What is Dependency and Dev Dependency?",
      answer: "Dependencies production ke time chahiye hote hain, jaise React, axios. DevDependencies sirf development ke dauran chahiye jaise eslint, testing libraries. Inko hum `package.json` me alag define karte hain jisse production me unnecessary packages na jayein.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 13,
      question: "What is Node Module?",
      answer: "`node_modules` folder me sabhi install kiye gaye packages aur unki sub-dependencies store hoti hain. Jab hum `npm install` chalate hain to yahi folder ban kar sari dependencies ko store karta hai.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 14,
      question: "What is NPX?",
      answer: "NPX (Node Package Execute) ek command line tool hai jisse hum bina globally install kiye kisi npm package ko directly run kar sakte hain. Jaise `npx create-react-app myapp` command se hum create-react-app ko run karte hain bina install kiye.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 15,
      question: "What is npm ci?",
      answer: "`npm ci` ka matlab hai clean install. Ye command pehle `node_modules` folder ko delete karta hai aur `package-lock.json` ke exact versions ke packages ko install karta hai. CI/CD pipelines me ye recommended hai.",
      category: "tools",
      icon: <Package className=\"w-5 h-5\" />
    },
    {
      id: 16,
      question: "What is Build in React?",
      answer: "Build process me React app ka code compress aur optimize kiya jata hai taaki vo production ready ban jaye. `npm run build` command se build folder generate hota hai jise kisi bhi server par host kiya ja sakta hai.",
      category: "build",
      icon: <Zap className=\"w-5 h-5\" />
    },
    {
      id: 17,
      question: "What is Webpack, Parcel and Vite?",
      answer: "Ye teeno bundlers hain jo humare code ko bundle aur optimize karte hain. Webpack zyada customizable hai, Parcel zero config setup deta hai, aur Vite fastest hota hai dev server ke liye. In sabme HMR (Hot Module Replacement) support hoti hai.",
      category: "build",
      icon: <Zap className=\"w-5 h-5\" />
    },
    {
      id: 18,
      question: "What is Server?",
      answer: "Server ek powerful computer hota hai jo clients ko data, services ya web pages provide karta hai. Web server, database server, file server jaise kai types ke server hote hain.",
      category: "server",
      icon: <Server className=\"w-5 h-5\" />
    },
    {
      id: 19,
      question: "What is JSX?",
      answer: "JSX ek syntax extension hai jo HTML jaise dikhne wale code ko JavaScript me likhne deta hai. React me JSX ko Babel convert karta hai into `React.createElement` calls, jo ek JS object return karta hai. Fir React us object ko DOM me render karta hai.",
      category: "react",
      icon: <Code className=\"w-5 h-5\" />
    }],

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

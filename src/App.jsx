import { useState, useEffect , useCallback } from "react";
import "./App.css";

const data = [
  {
    id: 0,
    title: "Getting Started with JavaScript",
    content:
      "JavaScript is a versatile programming language used for web development. This article covers the basics of variables, functions, and control structures.",
  },
  {
    id: 1,
    title: "Understanding Array Methods",
    content:
      "Learn about common array methods like map(), filter(), and reduce() that make working with arrays in JavaScript more efficient and expressive.",
  },
  {
    id: 2,
    title: "The Basics of DOM Manipulation",
    content:
      "This article explains how to select, create, and modify HTML elements using JavaScript's Document Object Model (DOM) API.",
  },
  {
    id: 3,
    title: "Introduction to ES6 Features",
    content:
      "Explore modern JavaScript features introduced in ES6, including arrow functions, template literals, and destructuring assignments.",
  },
  {
    id: 4,
    title: "Asynchronous JavaScript: Promises and Async/Await",
    content:
      "Learn how to handle asynchronous operations in JavaScript using Promises and the more recent async/await syntax for cleaner code.",
  },
];

export default function App() {
  const [expanded, setExpanded] = useState(() => {
    let saved;
    try {
      saved = JSON.parse(sessionStorage.getItem("Expanded"));
    } catch {
      saved = new Array(data.length).fill(false);
    }
	return saved;
  });
  const [enableMultipleSelections, setenableMultipleSelections] = useState(
    sessionStorage.getItem("EnableMultipleSelections") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("Expanded", JSON.stringify(expanded));
  }, [expanded]);
  useEffect(() => {
    sessionStorage.setItem(
      "EnableMultipleSelections",
      enableMultipleSelections
    );
  }, [enableMultipleSelections]);

  const handleItemClick = useCallback( (id) => {
	setExpanded( (prev) => enableMultipleSelections ? prev.map( (ele , i) => i === id ? !ele : ele ) 
	: prev.map( (ele , i) => i === id ? !ele : false ) );
  },[enableMultipleSelections]);

  return (
    <>
      <button
        id="enable-multiple"
        onClick={() => setenableMultipleSelections(!enableMultipleSelections)}
      >
        {!enableMultipleSelections
          ? "Enable multiple selection"
          : "Disable multiple selection"}
      </button>

      <main>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className={`item ${expanded[item.id] ? "show" : "hide"}`}
            >
              <button onClick={() => handleItemClick(item.id)}>
                <h3>{item.title}</h3>
              </button>
              <p>{item.content}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}

/*
	--- get expanded if exists from session storage 

	--- save expanded in session storage
	--- get enableMultipleSelections if exists from session storage 
	--- save enableMultipleSelections in session storage 

*/

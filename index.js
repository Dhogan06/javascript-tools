import DauigiWebTools from "./webtools.js";

let tools = new DauigiWebTools();
tools.cookies.setCookie("TestCookie", "Testing");
console.log(tools.cookies.getCookie("TestCookie"));
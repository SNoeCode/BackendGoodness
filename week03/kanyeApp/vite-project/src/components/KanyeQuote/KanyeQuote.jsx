import axios from "axios";
//Dont forget to bring in your css
import "./KanyeQuote.css";
import React, { useState } from "react";

////this is a summary of the kanyewest quote api and my understanding of the request response cycle but also how it all inter connects to a deeper data type methods crud
const KanyeQuote = () => {
// so i must apolize please stick with my comments ok i would really appreicate feedback asap, becuase if something isnt connevting right i need to be corrected so it doesnt misfire any of my concept or the way i am understanfing this 
  const [quote, setQuote] = useState("");
  //i got here by wanting to change the color of the quote box when the button was clicked so first, we needed to set the color and store it as well,
  const [color, setColor] = useState("blue");

 //i am still going to make a loading function or maybe a terney statement. i check false in the default state  bc the loading isnt triggered uptil i trigger it, my thinking anyways. i have to switch the loading ==true ? return "loading data" : return data, do u see the difference in what is returned the true statement returns the string "loading data" the false returns the actually data. im guess the map or for each methods utlizie this the most, but for a more elobrate loading maybe you could implemt when a button is clicked a pokeball spins thats says loading  
  // const [loading, setLoading] = useState(false);
  
  //so i know i want to change the color on the click of the button when a quote is generated, well to get random colors we need colors to pick from, this is an array, it differnts from objects in the sense that arrays uses indexs and objects use key value pairs, also i believe arrays are ordered data types, getting the value by the index in the array,  and objects are not ordered the are accressed by a key by using dot notation for example const sexyPerson = {name: "SHanna"} the value is accessed by sexyPerson.name, and the value is "Shanna", the key is the first part in the : seperated key : pair, anyways i dont need indexs or key/value for these values atm but we need color for randon COLOR changer 
  const colors = [
    "blue",
    "green",
    "red",
    "yellow",
    "pink",
    "orange",
    "purple",
    "royal blue",
    "indigo",
    "teal",
    "brown",
    "cyan",
    "light blue",
    "light green",
    "forest green",
    "dark green",
    "neon green"
  ];
  //so now i learned to generate random anything pretty much in js you have to use a math function so first u declare a variable to store this "calucation" in, randomIndex, bc arrays uses indexs right, Math.random gives us a decimal number between 0-1 example .83 ok so then we need to make sure that the number is a random number 0 to the lengh of my array, so we use the .length method on the ArrayProtype that gives us how many elemets are in the array so were basically, so when u use the legth protype method you get back the number of elements in the array, so when i console.log(colors.length) i will get 17 in my console, so we are able to get the zero index and we times it by the coloes.length we get 0 * 17, and then from there we say hey math.floor(rounds it down to the nearest interger so thats its garenteed to be a index in the array, if it rounded up it would miss every index by one right or worse returns colors[19]) then we set the action state to the color times the logic for rhe random color
  
  const changeColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
  };
console.log(colors.length) 

//0so we are declaring a variable and seting it to a asyrounous function and with key word  async we know that we are return a promise. now promises from what i understand are fetch and await .then().catch or try/{}catch{} each of all still has to have each promise complete req, res cycle and then u still have to set the res data to json dataright. axios does all this for you, it does req,res and the formats or parses the kjson data for you it basic proforms all of the promises jobs and even some of the api responses as well and then smacks .then() and .catch  in the face, now from what now i thoufgt when you used async await you had to use try catch thats nt tru ebut reconmended, howver from what i leanred you do not have to use the async keyword with .then or .catch however from what i understand the .then is paired with axios and that is an exception, not sure when in doubt on which promise to use, use the axios and the dot then. to sum it up its asking and ansering you ask you answer. 
const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.kanye.rest");
      //set state
      setQuote(response.data.quote);
    } catch (error) {
      console.log("error");
      // setQuote("could not ser quote")
    }
  };
  const handleClick = () => {
    fetchQuote();
    changeColor();
  };
  return (
    <>
      <div className="quote-container" style={{backgroundColor: color,  color: color ===  "pink" ? "blue" : "black",   textAlign: "center"}}>
        <h1>Kayne West Generator</h1>
        <div className="box-quote">
          <p className="quote">{quote || "Let Kanye inspire you today"}</p>
        </div>
        <button style={{backgroundColor: color,  color: color ===  "pink" ? "blue" : "pink",   textAlign: "center"}} onClick={handleClick}>Generate Quote</button>
      </div>
    </>
  );
};
export default KanyeQuote;


//Axios is a library that helps get http requests and and crud functions. 

//useStates pupose is to hold s value of whatever thing you are doing, its an action word, if i had to guess, and it saves the state of the action. SO action could be the thing u are doing, quote, toggle, loading, isOn, its setting and saving the action state of the action. 

//the fetchQuote fuction is makeing or  "getting" the api its asyrouonous so what that means its that async is going to return a promise in a speciific set of rules "http"://api.kayne.rest from the web, then axios automativally does the json, and both res, response.when u dont use axios it look like this fetch(api) .then((res)=>res.data(().then(data)=> {when all of that is down the u set ur state or intialize state }then u have the .catch ect ect axios does all that with just axios.get then 

//so u get the data response for the server, then we just .notation the key that we want to get the value out of, i also believe we might have to destructire the object as well, but we can also just destructure what data we need from the response.data we dont have to pull all the data we, can just use the differnt keys on the data.object example response.data.quote."this is a shitty example but see how the response has an oject attached to it and that data has keys attached to it, that equal the value of that specific requested data, am i correct in this thinking" lets say you request data from a plants api that has flowers thats purple, so of all the plants i want to see all the plants within this database with purple flowers, now the request goes ok .get(http://api/plants?flowers/purple:lavender flowers)im not sure that request is right but i would hope with a request like this i would get back a responbse of a the dataobject right with the data. {data: { plants:[{id: 1, name:lavender, flowers: {colors:[purple, blue]}}]}} ok so destructuring is taking that object and getting specific data. so plants.name.colors[name] is that right ok so sorry about this btw, im using this as my feedback and processing, by pretending that i have a second person to bounce off the understanding of this, anyways so the term payload is = to the response.data[obj] it self already destructured so if we have a example user.obj we would destructure the user.name or {name} from that object to get the value of that pair, that could possible or better yet probalbly gonna be a array of objects inside the user.onj that i could then use crud change the value updatr thr value and or delete or create a value to that obj. 

//now the syntex on the paramters and endpoints, quiery are not 1oopercent bc i was  just guessing, in the moment, i didnt look it up but whrn i actuallu look at the queries and parameters synetx and the endoints  and what there variables i should understnad routes much better. its sad that it took me this long to get this, but i get it


//let me end by saying, looking at it now, compared to last week, i get it, if that makes sense. such a hard and complex thing, for me, to grasp, and now even i see how i could use the mocha test to solve or help solve a algo, and by using the grand constructor in the sky what methods i use to solve an algo, by still using the same crud ideloly of that you are essentailing creatin,update, delete or just getting the data.obj values then that we then manipulate with the "methods" specific assigned to that protype at birth and have differnt, so u essentally have to know how each method works to crud the fa-database


//im so sorry, and i was just kiding i am totally needing your feed back on this. im not 100 percent sure on the last paragraph but in theroy i think i am getting it. its hard to ecxplain the concept of everything, bc it seems everything is like you said a big object its just the manner of finding the way or method to crud the data you need. and even the usehooks are like usestate is essestially just a action variable, ok i donre. sorry aagaiin, and i am remeber the synetx as well, which is equally imporant as well. sorry im soorry in fairness i sent this to alex as well and i guess im just connecting the design and idea of it. 
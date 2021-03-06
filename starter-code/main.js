const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/companies`;

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');

    function mainMenu(){
      clear();
      printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
          db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
            if (error) {
              console.log(error);
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
            } else {
              result.forEach((company)=>{console.log(company.name);});
              rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
            }
          });
          break;
          case "2":
            db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                // console.log(result.length);
                console.log(`There are ${result.length} companies`);
                // console.log(result);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "3":
            db.collection('companies').find({"founded_year": 2004}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                console.log(`${result.length} companies were founded in 2004`);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "4":
            db.collection('companies').find({"founded_month":2, "founded_year":2004}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "5":
            db.collection('companies').find({"founded_month":{"$gt":3, "$lt":7}, "founded_year":2004}, {name: 1, founded_month:1, _id: 0}).sort({founded_month:1}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(`${company.name}, ${company.founded_month}`);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "6":
            db.collection('companies').find({"offices.city": "Barcelona"}, {name: 1, _id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "7":
            db.collection('companies').find({}, {name: 1,number_of_employees:1,_id: 0}).sort({number_of_employees:-1}).limit(10).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.reverse().forEach((company)=>{console.log(`${company.name}, ${company.number_of_employees}`);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "8":
            db.collection('companies').find({"name":"Facebook"}, {name: 1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                console.log(result[0].name);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "9":
            db.collection('companies').find({"name":"Facebook"}, {name:1,number_of_employees:1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                console.log(`${result[0].name} has ${result[0].number_of_employees} employees`);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "10":
            db.collection('companies').find({"name":"Facebook"}, {"products.name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result[0].products.forEach((product)=>{console.log(product.name)});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "11":
            db.collection('companies').find({"name":"Facebook"}, {"relationships.is_past":1,"relationships.person.first_name":1,"relationships.person.last_name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result[0].relationships.forEach((employee)=>{if(employee.is_past===false){console.log(`${employee.person.first_name} ${employee.person.last_name}`);}});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "12":
            db.collection('companies').find({"name":"Facebook"}, {"relationships.is_past":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                let counter=0;
                result[0].relationships.forEach((employee)=>{if(employee.is_past===true){counter++};});
                console.log(counter);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "13":
            db.collection('companies').find({"relationships.person.first_name":"David", "relationships.person.last_name":"Ebersman"},{"name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                // relationships.forEach((company)=>{if(company.person.first_name==="David"&&company.person.last_name==="Ebersman"){console.log(company.name);}});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "14":
            db.collection('companies').find({"name":"Facebook"}, {"competitions.competitor.name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result[0].competitions.forEach((company)=>{console.log(company.competitor.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "15":
            db.collection('companies').find({"tag_list": {$regex: 'social-networking'}}, {"name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "16":
            db.collection('companies').find({$and:[{"tag_list": {$regex: /social-networking/i}},{"founded_year":{"$gte":2002, "$lte":2016}}]}, {"name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "17":
            db.collection('companies').find({"offices.city": /London/i}, {"name":1,"offices":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                // console.log(result);
                result.forEach((company)=>{
                  // console.log(company.offices);
                  const office=company.offices;
                  for(i=0;i,i<office.length;i++) {
                    if(office[i].city==="London"||office[i].city==="london"){
                      console.log(`${company.name},${office[i].address1} ${office[i].zip_code}`);}
                    }
                    });
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "18":
            db.collection('companies').find({$and:[{"tag_list": {$regex: /social-networking/i}},{"founded_year":{"$gte":2002, "$lte":2016}},{"offices.city": /New York/i}]}, {"name":1,_id: 0}).toArray((error, result) => {
              if (error) {
                console.log(error);
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              } else {
                result.forEach((company)=>{console.log(company.name);});
                rl.question(`\nType enter to continue: `, (answer) => { mainMenu();});
              }
            });
          break;
          case "0":
            console.log(`👋👋👋👋 😞 \n`);
            db.close((error) => { process.exit(0);});
          break;
          default:
            mainMenu();
            break;
        }
      });
	  }

    mainMenu();

  }
});

function printMenu(){
	console.log(`
0.- Exit
1.- List by name all companies.
2.- How many companies are there?
3.- How many companies were founded in 2004?
4.- List by name all companies founded in february of 2004.
5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
6.- What companies have offices in "Barcelona".
7.- List the 10 companies with more employees sorted ascending (show name and employees).
8.- Find the company with the name "Facebook"
9.- How many employees has Facebook?
10.- List the name of all the products of Facebook
11.- List the people that are working at Facebook right now (check relationships field)
12.- How many people are not working anymore at Facebook
13.- List all the companies where "david-ebersman" has worked.
14.- List by name the competitors of Facebook
15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
17.- Names and locations of companies that have offices in London
18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
`);
}
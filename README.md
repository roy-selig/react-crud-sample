
# Employee React Prototype

A quick and dirty prototype for performing CRUD operations on employee data.

## Requirements
1. Define a field set for an arbitrary table. This field set has the mandatory field id and as many additional fields as the user desires.

2. Add records. The user should be presented with a table of some kind. The user should be able to add records to the table and to edit any record existent in the table. The user should not be allowed to commit a record if the id is non unique amongst the other records in the table.

3. Export the records. The user should be able to export the records as csv and/or json. 



## Getting Started
1. On the command line, switch to the project directory and type ``npm install``. Project dependencies will be installed.   
2. On the command line type ``npm start``. The Web server and API server will start and the app will launch in your default browser.

## Setup

The Web server runs on localhost via port 3000. This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  


The API server runs on localhost via port 3004. The project uses [json-server](https://github.com/typicode/json-server).

I use [Concurrently](https://www.npmjs.com/package/concurrently) to launch both servers via ``npm start``. 

I modified react-scripts to use [Opn](https://www.npmjs.com/package/opn), which launches your default browser and points it to the app once the web server has started.

I farmed the sample data from [Mockaroo](https://mockaroo.com/).

## Folder Structure

```
app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    ...
  components/
    ...
  styles/
    ...
  data/
    db.json
```

## Supported Features
* **Search:** Type any value in the search box and the matching results show in the table. A wildcard search is performed across all columns in the table.  Try searching for `Ben`.
* **Sort:** Sort a column by clicking the icon in the corresponding column header. Click the same icon to sort the column in the opposite direction.
* **V-Scroll:** Scroll down the table to reveal more rows.  Note the column headers remain visible no matter how far down you scroll.
* **H-Scroll:** Scroll across the table to reveal more columns.  Note the first column is sticky.
* **Record Selection:** Click on a row. Note the detail form slides in displaying all the column data for that record.  Edit the name field. Note the name in the table behind the form does not yet change because you haven't committed the change.  Now Click save. Note the form slides out and the name in the table is updated to the new value.
* **Add Record:** From the toolbar at top click `Add`.  Note an empty form appears. Add the name `Alan Alda`. Click Save.  Note the form slides out and the table updates to show your new entry.  Any fields not given values out show an m-dash. 
* **Export:** From the toolbar at top click `Export`. Note a new tab opens in your browser revealing the entire dataset in JSON format.
* **Info Density:** From the toolbar click the right-most icon (high-density). Note the table is reflowed with cell-padding and font-size adjusted to fit more data on screen at once. Click the low-density icon to the left to revert the change.

## Caveats
This code has not been optimized due to time constraints.  Areas for optimization include:

1. Datasource optimization.  All the CRUD operations as well as filter and sort operations should be wrapped in a reusable class and passed to components as an object.  I started down this road (see `./components/datasource.js`). 
2. There are several UI elements which could and should be componentized.  They include the search field and the toolbar.
3. The page is not entirely responsive as of yet.  I do use flexbox for the toolbar, but the table relies on fixed width columns, largely because I wanted to explore a pattern that would support h-scroll & v-scroll while fixing column headers and first column.
4. I would want to implement infinite scroll to fetch additional records when the user reached a data boundary.
5. Unit and E2E tests have not been written.  
// document.getElementById('team1-select').addEventListener('click', fetchPlayerData);

function fetchAllPlayerData() {
    
    // const dropdownValue = document.getElementById('team1-select').value;

        queryToSend = ` SELECT *
        FROM PLAYERS P 
        INNER JOIN TEAMS T ON T.fullName = P.teamName 
        INNER JOIN SCHEDULE S ON S.Team = T.abbrv 
        INNER JOIN POSITIONS PO ON PO.Position = P.slotName
        LIMIT 100`;

    // console.log("queryToSend: ", queryToSend);

    fetch('https://ec2-18-221-254-20.us-east-2.compute.amazonaws.com:3306/api/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: queryToSend })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for dropdown');
        }
        return response.json();
    })
    .then(data => {
        console.log('Player Data:', data);
        //displayDataAll(data);       
        //displayDataCorr(data);        
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

function displayDataAll(data) {
    const dataContainer = document.getElementById('all-players-list');
    dataContainer.innerHTML = ''; // Clear existing content
    
    

    // Iterate over the data and display it
    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
        <div class="player-tile" style="background-color:#000000; display:flex; height: 40px; margin-top:5px; margin-bottom-5px; border-radius:10px; border-width:3px; border-style:solid; border-color:${item.Color};">
          <img src="images/${item.abbrv}.webp" style="background-color:#000000; margin:0px 0px 0px 0px; padding-right:20px; padding-left:10px; height:40px; width:40px;"></img>
          <font color="${item.Color}"> 
          <p style="background-color:#000000; align-text: center; height:40px; margin-top: 0px; margin-bottom: 0px; margin-left:0px; padding">
            ${item.slotName} - ${item.firstName} ${item.lastName} | ${item.abbrv} | ${item.conference} ${item.division} </br>
            Proj: ${item.projectedPoints} | ADP: ${item.adp} | Bye: ${item.byeWeek}
          </p>
        </div>
        `;
        // console.log("itemElement:",itemElement);
        dataContainer.appendChild(itemElement);
    });
    
}

function displayDataCorr(data) {
    const dataContainer = document.getElementById('corr-players-list');
    dataContainer.innerHTML = ''; // Clear existing content
    
    

    // Iterate over the data and display it
    data.forEach(item => {
        const itemElement = document.createElement('ul');
        itemElement.innerHTML = `
        <div class="player-tile" style="background-color:${item.teamcolor1}; display:flex; width:auto; height: 50px; border-radius:10px; border-width:5px; border-style:solid; border-color:${item.teamcolor1};">
          <img src="images/${item.abbrv}.webp" style="background-color:${item.teamcolor1}; margin:0px 0px 0px 0px; height:30px; width:30px;"></img>
          <font color="${item.teamcolor2}"> 
          <p style="background-color:${item.teamcolor1}; display:flex; align-text: center; height:50px; margin-top: 0px; margin-bottom: 0px;">
            ${item.slotName} - ${item.firstName} ${item.lastName} | ADP: ${item.adp} | Bye: ${item.byeWeek} | Proj: ${item.projectedPoints} ${item.teamName} - ${item.conference} ${item.division}
          </p>              
        </div>
        `;
        // console.log("itemElement:",itemElement);
        dataContainer.appendChild(itemElement);
    });
    
}




// Fetch data from the server
fetch('https://ec2-18-221-254-20.us-east-2.compute.amazonaws.com:3306/api/items')
    .then(response => response.json())
    .then(data => {
        const itemList = document.getElementById('allPlayerList');
        console.log(itemList);
        // Iterate through the array of items and create <li> elements
            data.forEach(item => {
                const listItem = document.createElement('li');                
          
                // Create a span element for each item's position
                const slotName = document.createElement('span');
                slotName.textContent = (item.slotName + ' - ');
          
                // Apply color dynamically based on item's Color property
                if (item.Color) {
                    slotName.style.color = item.Color // Assuming item.Color is a valid CSS color value
                } else {
                    slotName.style.color = 'black'; // Default color if item.Color is not provided
                }
          
                // Append the span to the list item
                listItem.appendChild(slotName);          
                // Append the list item to the list
                itemList.appendChild(listItem);

                // // Create a span element for each item's name
                const name = document.createElement('span');
                name.textContent = (item.firstName + ' ' + item.lastName + ' | '  + item.abbrv + ' | ' + item.adp + ' | ' + item.projectedPoints);
            
                // Apply color dynamically based on item's Color property
                if (item.Color) {
                    name.style.color = item.Color // Assuming item.Color is a valid CSS color value
                } else {
                    name.style.color = 'black'; // Default color if item.Color is not provided
                }
            
                // Append the span to the list item
                listItem.appendChild(name);          
                // Append the list item to the list
                itemList.appendChild(listItem);

              });
    })
    .catch(error => {
        console.error('Error fetching /api/items:', error);
    });    



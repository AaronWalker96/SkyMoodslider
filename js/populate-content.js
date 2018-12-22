//A function to update the content frames based on user mood selection
function populateContentFrames() {
    //Retrieve the content of the text file the user uploaded from localStorage
    var text = JSON.parse(localStorage.getItem('json'));

    //Get each slider value
    var agitatedCalm = document.getElementById("agitated-calm").value;
    var happySad = document.getElementById("happy-sad").value;
    var tiredAwake = document.getElementById("tired-awake").value;
    var scaredFearless = document.getElementById("scared-fearless").value;
    //Create a blank array to store the mood profile
    var moodProfile = [];

    //Get the user mood from the agitated-calm slider
    if (agitatedCalm > 0) {
        moodProfile.push("Calm");
    } else if (agitatedCalm < 0 ) {
        moodProfile.push("Agitated");
    }
    //Get the user mood from the happy-sad slider
    if (happySad > 0) {
        moodProfile.push("Sad");
    } else if (happySad < 0 ) {
        moodProfile.push("Happy");
    }
    //Get the user mood from the tired-awake slider
    if (tiredAwake > 0) {
        moodProfile.push("Awake");
    } else if (tiredAwake < 0 ) {
        moodProfile.push("Tired");
    }
    //Get the user mood from the scared-fearless slider
    if (scaredFearless > 0) {
        moodProfile.push("Fearless");
    } else if (scaredFearless < 0 ) {
        moodProfile.push("Scared");
    }

    //Update the content frames with random programme that matches the mood profile
    updateSlot(moodProfile, text);
}

//Function to return a random mood from the mood profile
function returnRandomMood(moods) {
    var randMood = moods[Math.floor(Math.random() * moods.length)];
    return randMood;
}

//Function to update a slot and it's image with a given mood
function updateSlot(moodProfile, text) {
    var i = 0; 
    var x = 0;
    var slots = ["slot1","slot2","slot3","slot4","slot5"];
    var imgs = ["img1","img2","img3","img4","img5"];
    var randMood = "";
    while (i < slots.length) {
        document.getElementById(slots[i]).textContent = "No content";
        document.getElementById(imgs[i]).style.backgroundImage = "url('content/nocontent.png')";
        i++;
    }

    i = 0; 
    var programmeList = [];
    //Loop through the array
    while (i < text['programmes'].length) {
        x = 0;
        randMood = moodProfile[Math.floor(Math.random() * moodProfile.length)];
        //If the mood matches the mood we're looking for, add the programme to an array of valid programmes
        while (x < moodProfile.length) {
            if (text['programmes'][i]['mood'] == moodProfile[x]){
                programmeList.push(i);
            }
            x++;
        }
        i++;
    }

    var randNum = 0;
    i = 0;
    //Populate each of the content slots
    while (i < slots.length) {
        //Select a random programme from the list of matched programmes
        randNum = Math.floor(Math.random() * programmeList.length);
        randomProg = programmeList[randNum];
        //Populate the programme slot and image
        document.getElementById(slots[i]).textContent = text['programmes'][randomProg]['name'];
        document.getElementById(imgs[i]).style.backgroundImage = 'url(content/' + String(text['programmes'][randomProg]['image path']);
        //Remove the selected programme from the valid programme list so no duplicates are selected
        programmeList.splice(randNum, 1);
        i++;
    }
}

# wdi-project-2
This is my second project for General Assembly

The inspiration:
I wanted to center my project over Brighton as it's where I live and there are many points of interest there.
We were tasked with using user authentication, google maps and an api/scraper to show information. 
I chose to highlight the local restaurants.

Pseudocode:
- user is welcomed to the landing page where the name of the website, some imagery and the options to
login | sign up | continue as guest
are available for them to select.
- Upon selecting 'login', the user is shown a modal box to enter their email and password credentials
If these are incorrect, they are advised with some red writing within the same modal box
If the details are correct, they are taken through to the main page where the options to leave reviews will already be open to them.
- Upon selecting 'sign up', the user is shown a modal box where they can register their name, email and password. Once signed up, they are taken through to the main page where the options to leave reviews will already be open to them.
- Upon selecting 'continue as a guest', the user is taken through to the main page where the option to leave reviews is not open to them. Should they click on the link to leave a review, they will be shown a modal box to ask them to sign up or continue as a guest.
- The main page consists of a map which the user can drag to find markers of the gluten-free restaurants located in the viewport.
- When a marker is clicked, the map will centre over the location and a sidebar will appear.
- The sidebar will have the restaurant name, a photo, the opening times(if possible), reviews, option to add a review (for members), add to wish-list (for members).
- The number of items in the wish list will show as a number in the accordion menu.
- When this number is clicked on, another accordion will show a list of the restaurants saved.
- The user will be able to select one of their wish-list items and will be taken to it's latLng and info in the main page.
- A 'sign in | sign up | logout' menu will be available at all times in the top right corner of the page.
- If there is time, I would like to include a weather app somewhere in the page.

Challenges and achievements:
I found the api that I used had limited information about Brighton. There were some restaurants plotted (100) which show on the map and which include the information on the venue.
I achieved a good level of styling and the page is mobile responsive.

<img width="1280" alt="screen shot 2016-09-20 at 08 58 20" src="https://cloud.githubusercontent.com/assets/19531715/18662119/c46ef7c6-7f10-11e6-89ea-983fad789912.png">

<img width="1280" alt="screen shot 2016-09-20 at 08 59 09" src="https://cloud.githubusercontent.com/assets/19531715/18662123/cb87a382-7f10-11e6-9a86-5fd006f81616.png">

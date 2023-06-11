# Testing

[Return to the main README](README.md)

### W3C HTML

The [W3C HTL validation service](https://validator.w3.org/) was used to check the validity of HTML in the application.
![Initial W3C test result](documentation/testing/w3c-initial.png)

### W3C CSS

The [W3C CSS validation service](https://jigsaw.w3.org/css-validator/) was used to check the validity of CSS in the application. No errors were found with the CSS in the application/

![W3C CSS test result](documentation/testing/w3c-css.png)

<p>
    <a href="https://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="https://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!" />
    </a>
</p>

There were, however, 707 warnings generated for the applcation. However, all of these warnings come from the import of bootstrap in the project:
![W3C CSS warnings](documentation/testing/w3c-css-warnings.png)

### ESLint

### Automatic Testing

### Manual Testing

### Sign up

These routes address the following user stories:

- As a **visitor** I can **register for an account** so that **I can have a user profile with picture and have full access to the site, make, comment on and like posts and events**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Sign in

These routes address the following user stories:

- As a **registered user** I can **log in to my account** so that **I can have full access to the site, make, comment on and like posts and events**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Profiles

These routes address the following user stories:

- As a **user** I can **view other user's profiles** so that I can **see a specific user's posts and events**
- As a **user** I can **have a profile created for me, add a profile picture and edit my profile** so that **I can have a custom profile picture and display information about myself**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Posts

These routes address the following user stories:

- As a **user** I can **view specific posts from another user in their profile** so that **I can see that user's post activity**
- As a **visitor** I can **view a list of posts** so that **I can view recent uploads and decide if I want to sign up**
- As a **visitor** I can **view individual posts** so that **I can read the post in more detail and see the associated comments**
- As a **user or visitor** I can **scroll through a list of posts** so that **I can browse the site more comfortably**
- As a **user** I can **create posts** so that **I can share information about events with other users**
- As a **user** I can **edit or delete my own posts** so that **I can fix incorrect information, add more information, or remove the post entirely**
- As a **user** I can **see posts made specifically by my friends** so that **I can easily access the posts most relevant to me**
- As a **user** I can **access a page containing posts I've liked** so that **I can easily find these posts again**
- As a **user** I can **choose an event from my event list when I post** so that **I can make a post about that specific event**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Events

These routes address the following user stories:

- As a **user** I can **view specific events from another user in their profile** so that **I can see that user's events**
- As a **user** I can **choose an event from my event list when I post** so that **I can make a post about that specific event**
- As a **visitor** I can **view public events** so that **I can see what events are planned and see if I would like to create an account to add the event(s) to my calendar**
- As a **visitor** I can **view individual events** so that **I can see more detail about the event and see any associated comments**
- As a **user or visitor** I can **scroll through a list of events** so that **I can browse the site more comfortably**
- As a **user** I can **create events** so that **I can share information about events with other users**
- As a **user** I can **edit or delete my own events** so that **I can fix incorrect information, add more information, or remove the event entirely**
- As a **user** I can **view my friend's events on a seperate page** so that **I can quickly browse events most relevant to me**
- As a **user** I can **see my upcoming events on a sidebar** so that **I can quickly see which of my events are coming up soon**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Calendars

These routes address the following user stories:

- As a **user** I am **automatically assigned a calendar** so that **I can easily view my events**
- As a **user**, **the events I create are automatically added to my calendar** so that **I can immediately visualise them**
- As a **user** I can **add and remove other user's events to/from my calendar** so that **I can visually see when they will take place on my personal calendar**
- As a **user** I can **toggle the view of my calendar between year, month, week and day** so that **I can easily visualise my time and see when events are**
- As a **user** I can **navigate between days, weeks, months and years using directional arrows** so that **I can easily visualise my events in my calendar**
- As a **user** I can **click a day and see the events planned for that day** so that **I can quickly see which (if any) events are taking place on a day**
- As a **user** I have **the option to add an event from my calendar** so that **I can easily create new events**
- As a **user** I can **click an event in my calendar to see the event details** so that **I can easily visualise events in my calendar**
- As a **user** I have **a button to see the specific event when I click in in my calendar** so that **I can view further details, edit and delete it**
- As a **user** I can **syncronise my events with my google calendar** so that **I can keep one universal collection of events wherever I am**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Comments

These routes address the following user stories:

- As a **user** I can **create comments on posts** so that **I can communicate with the poster and other users about the post content**
- As a **user** I can **edit and delete my own comments** so that **I can amend or remove the comment I wrote**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Likes

These routes address the following user stories:

- As a **user** I can **like other user's posts** so that **I can show that user I appreciated their content**
- As a **user** I can **access a page containing posts I've liked** so that **I can easily find these posts again**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Memories

These routes address the following user stories:

- As a **user** I can **add memories to past events** so that **I can store my comments and images to look at later**
- As a **user** I can **edit or delete my own memories** so that **I can fix incorrect information, add more information, or remove the memory entirely**
- As a **user** I can **add plans to future events** so that **I can plan my event more effectively and store useful information together**
- As a **user** I can **edit or delete my own plans** so that **I can fix incorrect information, add more information, or remove the plan entirely**
- As a **user** I can **switch between plans and memories** so that **I can see all information associated with an event**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Watches

These routes address the following user stories:

- As a **user** I can **watch/unwatch other user's posts** so that **it is added to my watched events list**
- As a **user** I can **view my watched events on a seperate page** so that **I can keep an eye on the event and easily find it again**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Followers

These routes address the following user stories:

- As a **user** I can **add other users as friends** so that **I can preferentially see their posts and events**
- As a **user** I can **view all the users I have added as a friend** so that **I can easily see them, access their profile or remove them**
- As a **user** I can **see posts made specifically by my friends** so that **I can easily access the posts most relevant to me**
- As a **user** I can **see popular profiles on the side panel on the posts page** so that **I can decide who to add as a friend**
- As a **user** I can **view my friend's events on a seperate page** so that **I can quickly browse events most relevant to me**

<details> 
<summary>See more</summary>

| Login state | URI | Testing | Response | Screenshot |
| ----------- | --- | ------- | -------- | ---------- |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |
|             |     |         |          |            |

</details>

### Responsiveness

The responsive design tests were carried out manually throughout the build using Google Chrome Dev Tools.

Three main breakpoint values were used for testing -

### Browser Compatibility

### Lighthouse

### Bugs

Resolved
Many bugs were found and resolved throughout the development of the app. These were recorded using the standard "Bug report" issue template in Github.

| Issue # | Bug title                                                                                                                                                       | Resolved |
| :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
|   46    | [Past events page doesn't render "no results found"](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/46)                                    | &check;  |
|   47    | [Unable to edit post without adding event](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/47)                                              | &check;  |
|   48    | [When a post is edited, the event cannot be left unchanged ](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/48)                            | &check;  |
|   49    | [Cannot upload a post or event without an image](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/49)                                        | &check;  |
|   50    | [404 page not rendering when an unknown resource is called from a valid path](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/50)           | &check;  |
|   51    | [Editing an image in the edit memory form changes the image in the memory create form ](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/51) | &check;  |
|   52    | [Cannot add an image when memory is edited if no image in original memory ](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/52)             | &check;  |
|   53    | [Last image added to memory not cleared from form](https://github.com/dragon-fire-fly/organisation_app_frontend/issues/53)                                      | &check;  |

### Accessibility

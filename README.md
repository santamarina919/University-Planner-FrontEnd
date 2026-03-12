# University Planner Front End

## Goal
The goal of the front end of the application was to provide an interface that the user could easily understand at first glance. The application
works by planning their degree semester by semester. The interface would provide them with action they could take at that 
semester along with a summary of their entire plan and the progress in degree. Additionally, each choice the user made would be 
associated with an effect. The additional or removal of a course would notify the user of any effects that choice had. 


## How it works behind the scenes
Behind the scenes the front end of the application maintains an array of all the courses that are related to the degree
the user wants to obtain. Each course has its own state with associated variables like the earliest semester it can be added or the semester it is planned for.
Every choice a user makes will modify these state variables. 

When the user wants to modify the state of a course the backend is qquieried for any changes to other courses states. For example,
if course A is added to a user's plan the backend of the application may respond with a new state for course B and C as they could become available. 
The application also allows users to move between states that their plan has been through. This is acheived by maintaining an array of states after the 
user has made a choice. For example, if a user adds a course the new states that result from that choice are saved and the user has the choice to revert back to 
the previous state. 

## Deployment
This application was deployed using a GCP virtual machine. NGINX was used as the web server where the build output of the Angular 
project was uploaded. 

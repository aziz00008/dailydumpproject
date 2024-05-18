# Social Media Application

This is a simple social media application created using a microservices architecture. The application uses AWS S3 for storing media files, React for the frontend, and Docker Compose for container orchestration. This project was created for fun with friends and as a side project for my resume.

## Features

- User authentication and authorization ( done !)
- Posting and sharing media files  (under development....)
- Real-time updates and notifications (under development... notifications service coming soon....)
- Profile management (under development..)
- Commenting and liking posts (under developent..) 

## Architecture

The application is designed using microservices, with each service responsible for a specific part of the functionality. The services communicate with each other using REST APIs.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Storage:** AWS S3
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites

To run this application, you will need:

- Docker and Docker Compose installed on your machine
- AWS access keys to be activated 

### Running the Application

1. **Activate AWS Access Keys:**
   Since this application uses AWS S3 for media storage, i have to activate the keys for you if you wish to run the app. These keys are required for the application to interact with AWS S3. Please contact me..  I had to expose my secret keys for the app to be working.
   Please note that this application is for educational purpose only ! it is a bad practice to expose your aws keys !
3. **Run Docker Compose:**
   Once i activate the keys , navigate to the root directory of the project and run the following command:
   
   docker-compose up -d


<img src="https://raw.githubusercontent.com/aziz00008/dailydumpproject/bb8cc8e4f20765b5111d8d4f9766281f10584d1b/imgs/Screenshot%20from%202024-05-17%2020-12-18.png" width="700"/>
<img src="https://raw.githubusercontent.com/aziz00008/dailydumpproject/bb8cc8e4f20765b5111d8d4f9766281f10584d1b/imgs/Screenshot%20from%202024-05-17%2020-12-57.png" width="700"/>
<img src="https://raw.githubusercontent.com/aziz00008/dailydumpproject/bb8cc8e4f20765b5111d8d4f9766281f10584d1b/imgs/Screenshot%20from%202024-05-15%2021-09-31.png](https://raw.githubusercontent.com/aziz00008/dailydumpproject/master/imgs/Screenshot%20from%202024-05-17%2020-15-14.png" width="700"/>
<img src="https://raw.githubusercontent.com/aziz00008/dailydumpproject/bb8cc8e4f20765b5111d8d4f9766281f10584d1b/imgs/Screenshot%20from%202024-05-17%2020-13-13.png" width="700"/>
<img src="https://raw.githubusercontent.com/aziz00008/dailydumpproject/master/imgs/Screenshot%20from%202024-05-17%2020-15-14.png" width="700"/>


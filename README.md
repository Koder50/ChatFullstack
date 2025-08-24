# ChatFullstack

A fullstack chat application where **two users can communicate privately**.  
Multiple users can be logged in simultaneously, chats are persisted in a database, and chat history is automatically deleted every hour (demo mode).  

## Live Demo
localhost:8080 : logging extends functionality; 𝗹𝗼𝗴𝗶𝗻: student@mail.com, 𝗽𝗮𝘀𝘀: Chatanti1; 𝗹𝗼𝗴𝗶𝗻: teacher@mail.com, 𝗽𝗮𝘀𝘀: Chatanti1<br>
On Heroku: https://anti-hero-fullstack-4cfbfc6dbb64.herokuapp.com Logging: 𝗹𝗼𝗴𝗶𝗻: karol@mail7.com, 𝗽𝗮𝘀𝘀: Chatanti1; 𝗹𝗼𝗴𝗶𝗻: karol@mail8.com, 𝗽𝗮𝘀𝘀: Chatanti2

## Features:  
- Two-user private chats  
- User blocking  
- Multiple simultaneous sessions (different browsers/incognito)  
- Automatic chat history cleanup  
- Secure authentication with Spring Security  
- Swagger API documentation

## Table of Contents
- [ChatFullstack](#ChatFullstack) 
- [Live Demo](#live-demo) 
- [Features](#Features) 
- [Table of Contents](#table-of-contents) 
- [Screenshots](#Screenshots) 
- [Technologies](#Technologies) 
- [Swagger](#Swagger) 
- [Installation and usage](#installation-and-usage) 
- [Challenges](#Challenges) 

## Screenshots
<img width="1912" height="968" alt="chatFullstack1" src="https://github.com/user-attachments/assets/2d2e6770-e62d-4db7-a13f-5f52dedfc3e6" />
<img width="1917" height="965" alt="chatFullstack2" src="https://github.com/user-attachments/assets/716484a2-e9d2-48de-afb6-5d60e8be5d34" />
<img width="1911" height="965" alt="chatFullstack3" src="https://github.com/user-attachments/assets/2fe1b767-d87b-4b4d-ba70-a77b33be2bfc" />

## Technologies
Spring Boot,<br> Angular, <br>CSS, <br>Typescript,<br> HTML, <br>Java 17, <br>Spring Data JPA, <br>Swagger UI, 
<br>Spring Security, <br>JUnit, <br>AssertJ, <br>NGRX, <br>Maven, <br>Postgresql

## Swagger
http://localhost:8080/swagger-ui/index.html


## Installation and usage
I am using IntelliJ Idea:

1. Download Zip File from github(on main page of repository find green button 'Code', click it and then find and click 'Download Zip')
2. Open this project in IntelliJ Idea
3. Right click on the project name(Top left), it should be 'ChatFullstack [superheroes]'
4. Choose in the bottom 'Maven' -> 'Run Maven' -> 'Clean install' After about few minutes there should be one of messages: 'Build success'.
5. In IDE search for the play on bar slightly to the left on top of program and choose the left option from play, Run/Debug Configurations and choose Edit Configurations
6. Find '+' to the left on top (Add Configuration) and click it.
7. Then choose Application
8. Then choose name 'Chat' for example
9. Then there should be Java 17 SDK of 'superheroes' module.
10. Choose main class, there should be SuperheroesApplication and choose it
11. Click apply and then ok. You should run it(press play in correct configuration): then go to the browser to localhost:8080 or localhost:8080/ or localhost:8080/login and there should be login page
12. To start program, on the bar on top to the left from play you have the name of configuration, choose 'Chat' and click play, the program starts. Clean install and VideoPlayer configuration both successfully working enables swagger ad application login.
13. There is also Swagger. If the login data from CV is not working you have to in code delete 'Authorize' button, then create at least two users to talk(it should be emails, for example: student@mail.com, teacher@mail.com)
14. Now you can log in. There you use chat.
15. If there is some kind of problem with login or logout you in program click ctrl+shift+R type public\\index.html (double '\\') and click enter(search)
16. There should be one line found - double click on it. Now you have to specify those path for the current project path of index.html(find this file, right click on it choose 'Copy Path' and choose absolute path)
17. Now do 4.(clean install) and do 12. ( run configuration). Check if login and logout works.
18. If not, in program click ctrl+shift+R type frontend\src\index.html and click enter(search)
19. There should be one line found - double click on it. Now you have to specify those path as public\\index.html
20. Now do 4.(clean install) and do 12. ( run configuration). Check if login and logout works.
21. Until now everything should work(as you see, you needed to experiment with index.html path). You can chat now, good luck.

## Challenges

1. Updating chat messages.
2. Making two persons' conversation in each chat.
3. Setting blocked persons' list.
4. Logging to app for many accounts simultaneously.
5. Making each account see only chat with selected other person.
6. Making possible multiple different chats simultaneously for one account(condition: different devices or incognito mode - for each one instance of chat).
7. Saving chat messages in database chronologically.
8. Making Swagger.



















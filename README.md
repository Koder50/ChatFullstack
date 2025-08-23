# Project
It is a project of Chat. It is configured in such a way, that precisely two users can talk in one chat. 
Many users can be logged simultaneously. Every new hour all chat records are deleted (it is presentational 
chat, it should just show that it works). You can be logged as two users in the same time, 
when you for example use Google Chrome for one card, and another card in incognito state.
You can block also users, with which you don't want to talk. Every chat has its own records 
(database is used).

## Technologies
Spring Boot,<br> Angular, <br>CSS, <br>Typescript,<br> HTML, <br>Java 17, <br>Spring Data JPA, <br>Swagger UI, 
<br>Spring Security, <br>JUnit, <br>AssertJ, <br>NGRX, <br>Maven, <br>Postgresql

## Swagger
http://localhost:8080/swagger-ui/index.html

## How to use
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
17. Now do 4.(clean install) and do 12. ( run configuration). Check if login and logut works.
18. If not, in program click ctrl+shift+R type frontend\src\index.html and click enter(search)
19. There should be one line found - double click on it. Now you have to specify those path as public\\index.html
20. Now do 4.(clean install) and do 12. ( run configuration). Check if login and logut works.
21. Until now everything should work(as you see, you needed to experiment with index.html path). You can chat now, good luck.





